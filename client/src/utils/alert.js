import swal from "sweetalert";
// import { generateRandomDifficulty } from "./random-difficulty";
// import { getSessionWinner } from "./session-winner";
// import { computeNewDifficulty } from "./new-difficulty";
// import { game_mode, mode_type } from "./reusable-variables";
// import { playSound, sound } from "./game-sound";
// import AwardIcon from "../assets/images/awards-icon.jpg";

// export const alertError = (errorMsg) => {
//   swal({
//     icon: "error",
//     buttons: {
//       confirm: true,
//     },
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     content: {
//       element: "p",
//       attributes: {
//         textContent: `${errorMsg}`,
//       },
//     },
//   });
// };

// export const alertNoSessionWinner = async (initialState, contextDispatch) => {
//   const { SINGLE, MULTI } = game_mode;
//   const { SESSION, RANDOM, PROGRESSIVE } = mode_type;
//   const {
//     numberToGuess,
//     sessionCount,
//     selectedMode,
//     onePlayerGameType,
//     multiPlayerGameType,
//     difficulty,
//     numOfPlayer,
//     numOfAttempt,
//     counter,
//     numOfGamesInSession,
//     turnSoundOff,
//   } = initialState;

//   const { newDifficulty, newNumOfPlayer } = computeNewDifficulty(
//     difficulty,
//     numOfPlayer,
//     counter
//   );

//   const errorMsg =
//     selectedMode === `${SINGLE}`
//       ? "Wrong guess! Attempts used up! Try again."
//       : " No winner in this round!";

//   const value = await swal({
//     icon: "error",
//     content: {
//       element: "div",
//       attributes: {
//         innerHTML: `<h3 style="color: maroon; font-weight: bolder">${errorMsg}</h3><br /><h4>Romeo picked ${numberToGuess}</h4>`,
//         // style: " font-family: 'Orbitron', sans-serif; font-size: 1.2rem",
//       },
//     },
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     dangerMode: true,

//     buttons: {
//       continue: {
//         text: "Start A New Round",
//         value: "continue",
//       },
//       quit: {
//         text: "End Game",
//         value: "quit",
//       },
//     },
//   });
//   switch (value) {
//     case "continue":
//       contextDispatch({ type: "SHOW_GAME_PREP_PAGE" });

//       if (selectedMode === `${MULTI}` && multiPlayerGameType === `${SESSION}`) {
//         if (Number(numOfGamesInSession) === Number(sessionCount)) {
//           // !turnSoundOff && playSound(sound.SessionWon);
//           alertSessionEnd(initialState, contextDispatch);
//         } else {
//           contextDispatch({
//             type: "SET_NEW_SESSION_COUNT",
//             payload: { sessionCount: sessionCount + 1 },
//           });
//         }
//       }
//       if (selectedMode === `${SINGLE}` && onePlayerGameType === `${RANDOM}`) {
//         contextDispatch({
//           type: "RANDOMIZE_THE_DIFFICULTY",
//           payload: { difficulty: generateRandomDifficulty() },
//         });
//       }
//       if (
//         selectedMode === `${SINGLE}` &&
//         onePlayerGameType === `${PROGRESSIVE}`
//       ) {
//         contextDispatch({
//           type: "COMPUTE_NEW_DIFFICULTY",
//           payload: {
//             numOfPlayer: newNumOfPlayer,
//             difficulty: newDifficulty,
//             numOfAttempt,
//           },
//         });
//         contextDispatch({
//           type: "INCREMENT_COUNTER",
//           payload: {
//             counter: counter + 1,
//           },
//         });
//       }
//       break;

//     default:
//       !turnSoundOff && playSound(sound.QuitNotice);
//       alertQuit(contextDispatch, {}, false);
//       break;
//   }
// };

// export const alertSessionEnd = async (initialState, contextDispatch) => {
//   const { newGame, turnSoundOff, numOfGamesInSession } = initialState;

//   const { maxScore, winningPlayers, winningPlayersWithProps } =
//     getSessionWinner(newGame);

//   const hasNoWinner = winningPlayers.length > 1 || maxScore === 0;

//   let winningMsg = `<p><img src=${AwardIcon} style="height:35px; width:35px" alt="Trophy Icon"/></p><br /><h4>${
//     winningPlayers[0]
//   } wins the session with ${maxScore} point${maxScore > 1 ? "s" : ""} </h4>`;

//   let noWinnerMsg = "";

//   if (winningPlayers.length > 1 && maxScore > 0) {
//     //format the players name in the format - John, Doe, and Jane
//     let players = new Intl.ListFormat("en-us").format(winningPlayers);

//     // newGame.setTempBucketForPlayers(newGame.getPlayersInvolved());
//     // newGame.setTempNumOfRoundsInSession(numOfGamesInSession);

//     noWinnerMsg = `<h4 style="color:red">No winner for this session! ${players} are tied on ${maxScore} point${
//       maxScore > 1 ? "s" : ""
//     }</h4>`;
//   } else if (maxScore === 0) {
//     noWinnerMsg =
//       "<h4 style='color:red'>No winner for this session! All players have 0 point.</h4>";
//   }

//   !hasNoWinner && !turnSoundOff && playSound(sound.SessionWon);

//   const value = await swal({
//     icon: "success",
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     dangerMode: true,
//     content: {
//       element: "div",
//       attributes: {
//         innerHTML: `<h3 style="color: green; padding-top:5px; font-weight: bolder">END OF SESSION!</h3><br /> ${
//           hasNoWinner ? noWinnerMsg : winningMsg
//         }`,
//         // style: " font-family: 'Orbitron', sans-serif",
//       },
//     },

//     buttons: {
//       findWinner: {
//         text: "Find A Winner",
//         value: "find-winner",
//         visible: winningPlayers.length > 1 && maxScore > 0,
//       },
//       continue: {
//         text: "New Session",
//         value: "new-session",
//       },
//       viewScore: {
//         text: "View Score",
//         value: "view-score",
//       },
//       quit: {
//         text: "Home",
//         value: "home",
//       },
//     },
//   });
//   switch (value) {
//     case "new-session":
//       if (newGame.getTempBucketForPlayers().length > 0) {
//         newGame.setPlayersInvolved(newGame.getTempBucketForPlayers());
//         contextDispatch({
//           type: "SET_NEW_NO_OF_ROUNDS_FOR_SESSION",
//           payload: {
//             numOfGamesInSession: newGame.getTempNumOfRoundsInSession(),
//             numOfPlayer: newGame.getTempBucketForPlayers().length,
//           },
//         });
//       }

//       newGame.resetAll();

//       contextDispatch({
//         type: "SET_NEW_SESSION_COUNT",
//         payload: { sessionCount: 1 },
//       });
//       contextDispatch({
//         type: "SHOW_GAME_PREP_PAGE",
//       });
//       break;
//     case "view-score":
//       contextDispatch({
//         type: "UPDATE_TRIGGERED_BY_TAB",
//         payload: { triggeredByTab: false },
//       });
//       contextDispatch({
//         type: "SHOW_SCORE_TABLE",
//         payload: { showScoreTable: true },
//       });
//       break;
//     case "find-winner":
//       newGame.setTempBucketForPlayers(newGame.getPlayersInvolved());
//       newGame.setTempNumOfRoundsInSession(numOfGamesInSession);
//       newGame.setPlayersInvolved(winningPlayersWithProps);
//       newGame.resetAll();
//       contextDispatch({
//         type: "SET_NEW_NO_OF_ROUNDS_FOR_SESSION",
//         payload: { numOfGamesInSession: 2, numOfPlayer: winningPlayers.length },
//       });
//       contextDispatch({
//         type: "SET_NEW_SESSION_COUNT",
//         payload: { sessionCount: 1 },
//       });
//       contextDispatch({
//         type: "SHOW_GAME_PREP_PAGE",
//       });
//       break;

//     default:
//       contextDispatch({ type: "SHOW_HOME_PAGE" });
//       break;
//   }
// };

export const alertDelete = async (id, axiosAuth, deletePost) => {
  const willDelete = await swal({
    title: "Are you sure you want to delete this post?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
    closeOnClickOutside: false,
    closeOnEsc: false,
  });
  if (willDelete) {
    deletePost(id, axiosAuth);
  }
};

// //---------------------- Success Alert ----------------------

// export const alertSuccess = async (
//   winningPlayerName,
//   initialState,
//   contextDispatch
// ) => {
//   const { SINGLE, MULTI } = game_mode;
//   const { SESSION, RANDOM, PROGRESSIVE } = mode_type;
//   const {
//     numberToGuess,
//     sessionCount,
//     selectedMode,
//     onePlayerGameType,
//     multiPlayerGameType,
//     numOfGamesInSession,
//     difficulty,
//     numOfPlayer,
//     numOfAttempt,
//     counter,
//     turnSoundOff,
//   } = initialState;

//   const { newDifficulty, newNumOfPlayer } = computeNewDifficulty(
//     difficulty,
//     numOfPlayer,
//     counter
//   );

//   const title = `${winningPlayerName} win${
//     selectedMode === `${SINGLE}` ? "" : "s"
//   }!`;

//   const value = await swal({
//     icon: "success",
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     dangerMode: true,
//     content: {
//       element: "div",
//       attributes: {
//         innerHTML: `<h3 style="color: green; padding-top:5px; font-weight: bolder">${title}</h3><br /><h4>Romeo picked ${numberToGuess}</h4>`,
//         // style: " font-family: 'Orbitron', sans-serif",
//       },
//     },
//     buttons: {
//       continue: {
//         text: "Continue",
//         value: "continue",
//       },
//       viewScore: {
//         text: "Check Score",
//         value: "score",
//       },
//       quit: {
//         text: "End Game",
//         value: "quit",
//       },
//     },
//   });
//   switch (value) {
//     case "continue":
//       contextDispatch({
//         type: "PLAY_MUSIC",
//         payload: {
//           playBackgroundMusic: false,
//           playBackgroundMusic2: true,
//         },
//       });
//       if (selectedMode === `${SINGLE}` && onePlayerGameType === `${RANDOM}`) {
//         contextDispatch({
//           type: "RANDOMIZE_THE_DIFFICULTY",
//           payload: { difficulty: generateRandomDifficulty() },
//         });
//         contextDispatch({
//           type: "SHOW_GAME_PREP_PAGE",
//         });
//       } else if (
//         selectedMode === `${MULTI}` &&
//         multiPlayerGameType === `${SESSION}`
//       ) {
//         if (Number(numOfGamesInSession) === Number(sessionCount)) {
//           // !turnSoundOff && playSound(sound.SessionWon);
//           alertSessionEnd(initialState, contextDispatch);
//         } else {
//           contextDispatch({
//             type: "SET_NEW_SESSION_COUNT",
//             payload: { sessionCount: sessionCount + 1 },
//           });
//           contextDispatch({
//             type: "SHOW_GAME_PREP_PAGE",
//           });
//         }
//       } else if (
//         selectedMode === `${SINGLE}` &&
//         onePlayerGameType === `${PROGRESSIVE}`
//       ) {
//         contextDispatch({
//           type: "COMPUTE_NEW_DIFFICULTY",
//           payload: {
//             numOfPlayer: newNumOfPlayer,
//             difficulty: newDifficulty,
//             numOfAttempt,
//           },
//         });
//         contextDispatch({
//           type: "INCREMENT_COUNTER",
//           payload: {
//             counter: counter + 1,
//           },
//         });

//         contextDispatch({
//           type: "SHOW_GAME_PREP_PAGE",
//         });
//       } else {
//         contextDispatch({
//           type: "SHOW_GAME_PREP_PAGE",
//         });
//       }

//       break;
//     case "score":
//       contextDispatch({
//         type: "PLAY_MUSIC",
//         payload: {
//           playBackgroundMusic: false,
//           playBackgroundMusic2: true,
//         },
//       });
//       contextDispatch({
//         type: "UPDATE_TRIGGERED_BY_TAB",
//         payload: { triggeredByTab: false },
//       });
//       contextDispatch({
//         type: "SHOW_SCORE_TABLE",
//         payload: { showScoreTable: true },
//       });
//       break;

//     default:
//       !turnSoundOff && playSound(sound.QuitNotice);
//       alertQuit(contextDispatch, initialState, false);
//       break;
//   }
// };

// export const alertNoWinner = async (initialState, contextDispatch) => {
//   const { SINGLE, MULTI } = game_mode;
//   const { SESSION, RANDOM, PROGRESSIVE } = mode_type;
//   const {
//     numberToGuess,
//     sessionCount,
//     selectedMode,
//     onePlayerGameType,
//     multiPlayerGameType,
//     difficulty,
//     numOfPlayer,
//     numOfAttempt,
//     counter,
//     numOfGamesInSession,
//     turnSoundOff,
//   } = initialState;

//   const { newDifficulty, newNumOfPlayer } = computeNewDifficulty(
//     difficulty,
//     numOfPlayer,
//     counter
//   );

//   const errorMsg =
//     selectedMode === `${SINGLE}`
//       ? "Wrong guess! Attempts used up! Try again."
//       : " No winner in this round!";

//   const value = await swal({
//     icon: "error",
//     content: {
//       element: "div",
//       attributes: {
//         innerHTML: `<h3 style="color: maroon; font-weight: bolder">${errorMsg}</h3><br /><h4>Romeo picked ${numberToGuess}</h4>`,
//         // style: " font-family: 'Orbitron', sans-serif; font-size: 1.2rem",
//       },
//     },
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     dangerMode: true,

//     buttons: {
//       continue: {
//         text: "Start A New Round",
//         value: "continue",
//       },
//       quit: {
//         text: "End Game",
//         value: "quit",
//       },
//     },
//   });
//   switch (value) {
//     case "continue":
//       contextDispatch({ type: "SHOW_GAME_PREP_PAGE" });

//       if (selectedMode === `${MULTI}` && multiPlayerGameType === `${SESSION}`) {
//         if (Number(numOfGamesInSession) === Number(sessionCount)) {
//           // !turnSoundOff && playSound(sound.SessionWon);
//           alertSessionEnd(initialState, contextDispatch);
//         } else {
//           contextDispatch({
//             type: "SET_NEW_SESSION_COUNT",
//             payload: { sessionCount: sessionCount + 1 },
//           });
//         }
//       }
//       if (selectedMode === `${SINGLE}` && onePlayerGameType === `${RANDOM}`) {
//         contextDispatch({
//           type: "RANDOMIZE_THE_DIFFICULTY",
//           payload: { difficulty: generateRandomDifficulty() },
//         });
//       }
//       if (
//         selectedMode === `${SINGLE}` &&
//         onePlayerGameType === `${PROGRESSIVE}`
//       ) {
//         contextDispatch({
//           type: "COMPUTE_NEW_DIFFICULTY",
//           payload: {
//             numOfPlayer: newNumOfPlayer,
//             difficulty: newDifficulty,
//             numOfAttempt,
//           },
//         });
//         contextDispatch({
//           type: "INCREMENT_COUNTER",
//           payload: {
//             counter: counter + 1,
//           },
//         });
//       }
//       break;

//     default:
//       !turnSoundOff && playSound(sound.QuitNotice);
//       alertQuit(contextDispatch, {}, false);
//       break;
//   }
// };

// export const alertIncorrectGuess = async (initialState, contextDispatch) => {
//   const { turnSoundOff } = initialState;
//   const value = await swal({
//     // title: "Oops!",
//     // text: `Incorrect guess!`,
//     icon: "error",
//     content: {
//       element: "h2",
//       attributes: {
//         textContent: "Wrong guess!",
//         style: "color: maroon; font-weight: bolder",
//       },
//     },
//     closeOnClickOutside: false,
//     closeOnEsc: false,
//     dangerMode: true,

//     buttons: {
//       continue: {
//         text: "Continue",
//         value: "continue",
//       },
//       quit: {
//         text: "End Game",
//         value: "quit",
//       },
//     },
//   });
//   switch (value) {
//     case "continue":
//       break;

//     default:
//       !turnSoundOff && playSound(sound.QuitNotice);
//       alertQuit(contextDispatch, {}, false);
//       break;
//   }
// };
