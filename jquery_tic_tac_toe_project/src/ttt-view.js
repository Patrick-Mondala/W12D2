class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    this.$el.on("click", "li", event => {
      const $square = $(event.currentTarget);
      try {
        if (!this.game.isOver()) {
          this.game.playMove($square.data("pos"));
          this.makeMove($square);
        }
      } catch(error) {
        alert(error.msg);
      }
    });
  }

  makeMove($square) {
    let mark = this.game.currentPlayer;
    $square.addClass(mark);
    $square.addClass("white");
    let $squares = $(".square");
    if (this.game.isOver()) {
      $squares.removeClass("hoverable");
      $squares.addClass("white");
      $squares.addClass("loser");
      let winner = this.game.winner();
      let oppositeMark = ((winner === "x") ? "o" : "x");
      let endMessage

      if (winner) {
        $(`.${oppositeMark}`).addClass("winner");
        endMessage = $("<p></p>").text(`You win, ${oppositeMark}!`);
      } else {
        endMessage = $("<p></p>").text("It's a draw!");
      }
      endMessage.css("font-weight", "700");
      endMessage.css("font-size", "30px");
      this.$el.after(endMessage);
    }
  }

  setupBoard() {
    this.$el.css("display", "flex");
    this.$el.css("width", "300");
    this.$el.css("border", "5px solid #000");
    this.$el.css("flex-direction", "column");
      for (let rowIdx = 0; rowIdx < 3; rowIdx++) {
        let row = $("<ul></ul>")
        row.css("display", "flex");
        row.css("margin", "0");
        row.css("padding", "0");
          row.data("rowIdx", rowIdx);
        this.$el.append(row);
        for (let colIdx = 0; colIdx < 3; colIdx++) {
          let col = $("<li></li>");
          col.css("border", "5px solid #000");
          col.css("width", "90px");
          col.css("height", "90px");
          col.addClass("hoverable");
          col.addClass("square");
          col.addClass("grey");
          col.css("list-style-type", "none");
          col.data("pos", [rowIdx, colIdx]);
          row.append(col);
        }
      }
  }
}

module.exports = View;