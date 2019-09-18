class View {
  constructor(game, $rootEL) {
    this.game = game;
    this.$rootEL = $rootEL;
    this.setupTowers();
    this.clickTower();
  }

  setupTowers() {
    for (let towerIdx = 0; towerIdx < 3; towerIdx++) {
      let tower = $("<ul></ul>");
      tower.data("towerIdx", towerIdx);
      this.$rootEL.append(tower);
    }

    let towerFirst = this.$rootEL.children(":first");
    for (let i = 0; i < 3; i++) {
      let disc = $("<li></li>");
      disc.addClass("disc");
      switch (i) {
        case 0:
          disc.attr("id", "disc-one");
          break;
        case 1:
          disc.attr("id", "disc-two");
          break;
        case 2:
          disc.attr("id", "disc-three");
          break;
        default:
          break;
      }
      towerFirst.append(disc);
    }
  }

  render() {
    let $startPile = this.$rootEL.find(`[data-towerIdx]="${this.startPile}"`)
    // $(`ul:nth-child(${this.startPile})`)
    console.log("found startpile: " + $startPile);
    let $endPile = this.$rootEL.find(`[data-towerIdx]="${this.endPile}"`)
    let $topDisk = $startPile.children(":first");
    $startPile.remove($topDisk);
    console.log($topDisk);
    $endPile.append($topDisk);
  }

  clickTower() {
      $("ul").on("click", event => {
          console.log(event.currentTarget);
        const tower = $(event.currentTarget);
        this.pile = tower.data("towerIdx");
        if (this.startPile) {
            let $startPile = $(".selected");
            $startPile.removeAttr("id", "selected");
            let endPile = this.pile;

            let move = this.game.move(this.startPile, endPile)

            if (move) {
              this.render();
            } else {
              alert("Invalid Move. Try again.")
            }

            this.startPile = null;
            this.pile = null;
        } else {
            this.startPile = this.pile;
            tower.attr("id", "selected");
        }
      });
  }
}

module.exports = View;