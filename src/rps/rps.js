const rpsTemplate = `
  <div id="game">
    <div id="scoreboard">
    <div class="numberoutput">
          <div id="user-label" class="badge">
                <p>User</p>
                <div id="user-score">0</div>
          </div>
          <div id="user-label" class="badge">
                <p>PC</p>
                <div id="pc-score">0</div>
          </div>
          </div>  
    </div>
    <div id="result" class="hidden">
      <img id="pc-choice-img" src="" alt="PC Choice" />
    </div>
    <div id="choices">
      <button id="rock" class="choice">Rock</button>
      <button id="paper" class="choice">Paper</button>
      <button id="scissors" class="choice">Scissors</button>
    </div>
              <div>
            <p id="outcome"></p>
          </div>
    <div id="actions" class="hidden">
      <button id="continue">Continue</button>
      <button id="reset">Reset Score</button>
      <button id="return-to-lobby">Return to Lobby</button>
    </div>
  </div>
`;

export default rpsTemplate;
