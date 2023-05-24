import React, { useState, useEffect, useContext } from "react";
import { Alert } from "react-native";

import { useNavigation } from "@react-navigation/native";

import GameComponent from "./GameComponent";
import PracticeComponent from "./PracticeComponent";
import SnackComponent from "./SnackComponent";
import init3 from "../Functions/init3";
import init5 from "../Functions/init5";
import init6 from "../Functions/init6";
import sortBtm from "../Functions/sortBtm";
import {
  gameValsDefault,
  solutionsPractice,
  fixedCells,
  practiceSequence,
} from "../Functions/Objects";
import playSound from "../Functions/sfx";

import { MetaContext } from "../App";
import getSums from "../Functions/getSums";
import checkSolved from "../Functions/checkSolved";
export const GameContext = React.createContext(null);

export default function SummieBoard(props) {
  ////    ////    inits       ////    ////
  const consumeCtxt = useContext(MetaContext);
  const navigation = useNavigation();

  ////    ////    states      ////    ////
  const [isLoading, setIsLoading] = useState(true);
  const [phase, setPhase] = useState(0);
  const [longArray, setLongArray] = useState(null);
  const [gameVals, setGameVals] = useState({});
  const [btmVals, setBtmVals] = useState({});
  const [solutions, setSolutions] = useState({});
  const [initialGame, setInitialGame] = useState({});
  const [initialBtm, setInitialBtm] = useState({});
  const [pressed, setPressed] = useState([]);
  const [pressable, setPressable] = useState(false);
  const [cellsToFix, setCellsToFix] = useState([]);
  const [userFixed, setUserFixed] = useState([]);
  const [solved, setSolved] = useState(false);
  const [counter, setCounter] = useState(0);
  const [sums, setSums] = useState({
    c1_6: null,
    c6_1: null,
    c2_6: null,
    c6_2: null,
    c4_0: null,
    c0_4: null,
    c5_0: null,
    c0_5: null,
    c0_3: null,
    c3_6: null,
    c6_3: null,
    c3_0: null,
  });
  const [hints, setHints] = useState(null);
  const [hintModalVisible, setHintModalVisible] = useState(false);
  const [smartGrid, setSmartGrid] = useState(null);
  const [hintObj, setHintObj] = useState({});

  ////      ////    functions       ////    ////
  const redirectAfterError = async () => {
    //  I'm yet to see an error thrown during puzzle generation; this function is unlikely to ever be called.
    navigation.navigate("Menu");
  };

  const initialise = async () => {
    try {
      setIsLoading(false);
      if (props.diff === "break_my_brain") {
        const puzzle = await init6(props.diff);
        setLongArray(puzzle[5]);
        setGameVals(puzzle[0]);
        setBtmVals(puzzle[1]);
        setSolutions(puzzle[2]);
        setInitialGame(puzzle[3]);
        setInitialBtm(puzzle[4]);
        setCellsToFix(fixedCells[props.diff]);
        setTimeout(() => {
          setPressable(true);
        }, 500);
      } else if (
        props.diff === "easy" ||
        props.diff === "not_so_easy" ||
        props.diff === "slightly_stressful" ||
        props.diff === "kinda_hard" ||
        props.diff === "pretty_damn_tricky"
      ) {
        const puzzle = await init5(props.diff);
        setHintObj(puzzle[6]);
        setLongArray(puzzle[5]);
        setGameVals(puzzle[0]);
        setBtmVals(puzzle[1]);
        setSolutions(puzzle[2]);
        setInitialGame(puzzle[3]);
        setInitialBtm(puzzle[4]);
        setCellsToFix(puzzle[7][0]);
        setTimeout(() => {
          setPressable(true);
        }, 500);
      } else {
        const puzzle = await init3(props.diff);
        setGameVals(puzzle[0]);
        setBtmVals(puzzle[1]);
        setSolutions(puzzle[2]);
        setCellsToFix(fixedCells[props.diff]);
        setTimeout(() => {
          setPressable(true);
        }, 500);
        /*
        Add later.
        */
      }

      if (props.diff === "easy") {
        setHints(2);
      } else if (props.diff === "not_so_easy") {
        setHints(4);
      } else if (props.diff === "slightly_stressful") {
        setHints(6);
      } else if (props.diff === "kinda_hard") {
        setHints(8);
      } else if (props.diff === "pretty_damn_tricky") {
        setHints(10);
      } else if (props.diff === "break_my_brain") {
        setHints(12);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const initNewSnack = async () => {
    setSolved(false);
    const puzzle = await init3(props.diff);

    return new Promise((resolve, reject) => {
      setGameVals(puzzle[0]);
      setBtmVals(puzzle[1]);
      setSolutions(puzzle[2]);
      setCellsToFix(fixedCells[props.diff]);
      setTimeout(() => {
        setPressable(true);
      }, 500);
      resolve();
    });
  };

  const btmPress = (id, val) => {
    // Updates state in response to btmCell press.
    setPressed([id, val]);
  };

  const liftNumber = (id) => {
    //  Whenever an unoccupied gameCell is pressed ...
    if (pressed[0] != null) {
      //  If a btmCell has been pressed ...
      //  Set the value of the pressed gameCell to the value of the pressed btmCell.
      setGameVals({ ...gameVals, [id]: pressed[1] });
      //  Set the value of the pressed btmCell to null.
      setBtmVals({ ...btmVals, [pressed[0]]: null });
      //  Reset pressed array to [null, null].
      setPressed([null, null]);
      //  Increment the move counter.
      setCounter((prev) => prev + 1);
      playSound("lift", consumeCtxt.mute);
    }
  };

  const dropNumber = (id, val) => {
    //  Whenever an occupied gameCell is pressed (action handled in child component) ...
    const dropProm = new Promise((resolve, reject) => {
      try {
        setPressable(false);
        //  Set value of pressed gameCell to null.
        setGameVals({ ...gameVals, [id]: null });
        //  Set value of first vacant btmCell == to the dropped number.
        for (var i = 0; i < Object.keys(btmVals).length; i++) {
          if (btmVals["b" + i] == null) {
            setBtmVals({ ...btmVals, ["b" + i]: val });
            break;
          }
        }
        playSound("drop", consumeCtxt.mute);
        resolve();
      } catch (err) {
        console.log(err);
      }
    });

    dropProm.then(() => {
      setPressable(true);
    });
  };

  const updateSums = async () => {
    // Update sum cells whenever a cell is changed.
    try {
      setSums(await getSums(gameVals, props.diff));
    } catch (err) {
      console.log(err);
    }
  };

  const modifySG = async (arg) => {
    //setHints((prev) => prev - 1);
    try {
      if (smartGrid === null) {
        setTimeout(() => {
          Alert.alert(
            "SmartGrid enabled!",
            "Toggle the SmartGrid modes by scrolling the field above the grid.\n\nIf numbers below the grid are darkened, they do not belong on the highlighted side of the board."
          );
        }, 500);

        setHints((prev) => prev / 2);
      }

      if (arg === "default") {
        setSmartGrid("default");
      } else if (arg === "solve-left") {
        setSmartGrid("solve-left");
      } else if (arg === "solve-right") {
        setSmartGrid("solve-right");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const toggleHintModal = async () => {
    if (hintModalVisible === true) {
      setHintModalVisible(false);
    } else if (hintModalVisible === false) {
      setHintModalVisible(true);
    }
  };

  const editFixed = async (input, id, val) => {
    if (input == "user-fix") {
      setUserFixed([...userFixed, id]);
      setInitialGame({ ...initialGame, [id]: val });
      let sorted = await sortBtm("splice", initialBtm, val);
      setInitialBtm(sorted);
    } else if (input == "user-unfix") {
      setUserFixed((current) =>
        current.filter((element) => {
          return element !== id;
        })
      );
      setInitialGame({ ...initialGame, [id]: null });
      let sorted = await sortBtm("append", initialBtm, val);
      setInitialBtm(sorted);
    } else if (input == "hard-fix") {
      setCellsToFix([...cellsToFix, id]);
      setInitialGame({ ...initialGame, [id]: val });
      let sorted = await sortBtm("splice", initialBtm, val);
      setInitialBtm(sorted);
    }
  };

  const resetBoard = () => {
    const resetProm = new Promise((resolve, reject) => {
      try {
        setPressable(false);
        setGameVals(initialGame);
        setBtmVals(initialBtm);
        setPressed([null, null]);
        playSound("reset", consumeCtxt.mute);
        resolve();
      } catch (err) {
        console.log(err);
      }
    });

    resetProm.then(() => {
      setPressable(true);
    });
  };

  const incrementPhase = () => {
    setPhase((phase) => phase + 1);
  };

  ////      ////    useEffects      ////    ////
  useEffect(() => {
    if (props.mode == "game" || props.mode === "snack") {
      initialise();

      if (consumeCtxt.points === 0 && consumeCtxt.weeksSurvived === 0) {
        setTimeout(() => {
          setHintModalVisible(true);
        }, 1500);
      }
    } else {
      setPhase(0);
      setIsLoading(false);
      setGameVals(gameValsDefault);
      setSolutions(solutionsPractice);
      setLongArray([null]);
    }
  }, []);

  useEffect(() => {
    // Update sums whenever gameVals is modified.
    try {
      updateSums();
    } catch (err) {
      console.log(err);
    }
  }, [gameVals]);

  useEffect(() => {
    async function thisFunction() {
      try {
        if (counter > 0) {
          if (props.diff === "practice") {
            if (phase === 6) {
              if (sums.c3_0 === sums.c3_6) {
                incrementPhase();
              }
            }
            if (phase === 7) {
              if (sums.c0_3 === sums.c6_3) {
                incrementPhase();
              }
            }
            if (phase === 9) {
              if (sums.c2_6 === sums.c6_2 && gameVals.c2_4 === 7) {
                incrementPhase();
              }
            }
            if (phase === 10) {
              if (sums.c0_4 === sums.c4_0) {
                incrementPhase();
              }
            }
            if (phase === 11) {
              if (sums.c0_5 === sums.c5_0 && sums.c1_6 === sums.c6_1) {
                setSolved(true);
              }
            }
          }
          const result = await checkSolved(props.diff, sums, solutions);
          if (result === true) {
            setSolved(true);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }

    thisFunction();
  }, [sums]);

  useEffect(() => {
    //  Only relevant in practice mode.
    try {
      let importFixed = [];
      for (var i in practiceSequence[phase].fix) {
        importFixed.push(practiceSequence[phase].fix[i]);
      }
      console.log(importFixed);
      setCellsToFix([...cellsToFix, importFixed]);

      if (phase === 3) {
        setGameVals({ ...gameVals, c3_3: 9 });
      }
      if (phase === 5) {
        setGameVals({ ...gameVals, c3_2: 8, c3_4: 2 });
      }
      if (phase == 6) {
        setBtmVals({
          b0: 1,
          b1: 7,
        });
        setPressable(true);
      }
      if (phase === 7) {
        setGameVals({ ...gameVals, c1_3: 6, c5_3: 4 });
        setBtmVals({
          b0: 5,
          b1: 3,
        });
      }
      if (phase === 8) {
        //
      }
      if (phase === 9) {
        setGameVals({ ...gameVals, c2_2: 12, c4_2: 1 });
        setBtmVals({
          b0: 2,
          b1: 7,
          b2: 3,
        });
      }
      if (phase === 10) {
        setGameVals({ ...gameVals, c4_4: 11 });
        setBtmVals({ b0: 5, b1: 2 });
      }
      if (phase === 11) {
        setGameVals({ ...gameVals, c1_1: 22, c5_5: 18 });
        setBtmVals({ b0: 7, b1: 4, b2: 2, b3: 7, b4: 9, b5: 7 });
      }
    } catch (err) {
      console.log(err);
    }
  }, [phase]);

  ////      ////    context     ////    ////
  const ctxtElements = {
    phase,
    gameVals,
    btmVals,
    sums,
    solutions,
    initialBtm,
    pressed,
    pressable,
    solved,
    isLoading,
    diff: props.diff,
    mode: props.mode,
    counter,
    cellsToFix,
    userFixed,
    longArray,
    hintObj,
    hints,
    hintModalVisible,
    smartGrid,
    toggleHintModal,
    btmPress,
    liftNumber,
    dropNumber,
    editFixed,
    resetBoard,
    incrementPhase,
    modifySG,
    initNewSnack,
  };

  ////  ////    component       ////    ////
  return (
    <GameContext.Provider value={ctxtElements}>
      {props.mode === "game" ? (
        <GameComponent diff={props.diff} />
      ) : props.mode === "snack" ? (
        <SnackComponent diff={props.diff} />
      ) : (
        <PracticeComponent />
      )}
    </GameContext.Provider>
  );
}
