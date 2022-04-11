import { autorun, makeAutoObservable, runInAction } from "mobx";
import { BOARD_ROW, BOARD_COLUMN } from "../vars";

class Store {
  board = new Array(BOARD_ROW)
    .fill(0)
    .map((column) => new Array(BOARD_COLUMN).fill(0));

  soil = [];
  firstNum = 20;
  lastNum = 0;
  modified = [];
  initial = [];
  blues = [];

  constructor() {
    makeAutoObservable(this);
  }

  handleClick = (e, indexRow, indexColumn) => {
    e.preventDefault();
    const filledBelow = this.soil.filter(
      (elem) => indexRow + 1 === elem.row && indexColumn === elem.column
    );
    const filledAbove = this.soil.filter(
      (elem) => indexRow - 1 === elem.row && indexColumn === elem.column
    );

    if (indexColumn < this.firstNum) {
      this.firstNum = indexColumn;
    }
    if (indexColumn > this.lastNum) {
      this.lastNum = indexColumn;
    }

    const eitherOne = filledBelow.length !== 0 || indexRow + 1 === BOARD_ROW;
    if (
      this.soil?.some(
        (el) => el.row === indexRow && el.column === indexColumn
      ) &&
      filledAbove.length === 0
    ) {
      this.soil = this.soil?.filter(
        (el) => !((el.row === indexRow) & (el.column === indexColumn))
      );
    } else {
      if (eitherOne) {
        this.soil = [...this.soil, { row: indexRow, column: indexColumn }];
      } else {
        this.soil = [...this.soil];
      }
    }

    this.modified = [];
    this.blues = [];
  };

  reset = () => {
    this.soil = [];
    this.blues = [];
    this.modified = [];
  };

  run = () => {
    this.modified = this.initial.filter(
      (elem) =>
        elem.columnInitial >= this.firstNum &&
        elem.columnInitial <= this.lastNum
    );
  };

  setInitial(obj) {
    if (this.initial.length < 72) {
      runInAction(() => {
        this.initial = [...this.initial, obj];
      });
    }
  }

  setBlues = (blue) => {
    this.blues = [...this.blues, blue];
  };
}

export default new Store();
