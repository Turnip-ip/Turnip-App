export class Tape {
  head: HTMLDivElement;
  tape: HTMLDivElement;
  headM: HTMLDivElement;
  tapeM: HTMLDivElement;
  headW: HTMLDivElement;
  tapeW: HTMLDivElement;

  constructor(gramm_ver: number, elem: HTMLDivElement) {
    switch (gramm_ver) {
      case 0:
        this.gramm_v = 0;
        this.head = elem.getElementsByTagName("tape_head")[0];
        this.head_pos = null;
        this.tape = elem.getElementsByTagName("tr")[0];
        break;
      case 1:
        this.gramm_v = 1;
        this.tapeM = elem.getElementsByTagName("tr")[0];
        this.tapeW = elem.getElementsByTagName("tr")[1];
        this.head_posM = null;
        this.head_posW = null;
        this.headM = elem.getElementsByTagName("tape_head")[0];
        this.headW = elem.getElementsByTagName("tape_head")[1];
        break;
      case 2:
        // +++ we need size max...
        this.gramm_v = 2;
        this.tapeM = elem.getElementsByTagName("tr")[0];
        this.tapeW = elem.getElementsByTagName("tr")[1];
        this.head_posM = null;
        this.head_posW = null;
        this.headM = elem.getElementsByTagName("tape_head")[0];
        this.headW = elem.getElementsByTagName("tape_head")[1];
        break;
    }
  }

  write_tape(str: string, tape: HTMLDivElement) {
    // write one character per cell
    const children = tape.children;
    if (children.length < str.length) {
      console.log("write with str too long");
      return;
    }
    for (let i = 0; i < children.length; i++) {
      if (children[i].textContent != str[i]) {
        this.write_fade(children[i], str[i]);
      }
    }
  }

  write_fade(div: HTMLDivElement, cont: string) {
    div.style.opacity = 0;
    setTimeout(() => {
      div.textContent = cont;
      div.style.opacity = 1;
    }, 100);
  }

  write(str: string) {
    if (this.gramm_v == 0) this.write_tape(str, this.tape);
    else console.log("write called with grammar version > 0");
  }
  writeM(str: string) {
    if (this.gramm_v != 0) this.write_tape(str, this.tapeM);
    else console.log("writeM called with grammar version 0");
  }
  writeW(str: string) {
    if (this.gramm_v != 0) this.write_tape(str, this.tapeW);
    else console.log("writeW called with grammar version 0");
  }

  move_tape(pos: number, head: HTMLDivElement) {
    head.style.marginLeft = (50 * pos).toString() + "px";
  }

  move(pos: number) {
    if (this.gramm_v == 0) {
      this.move_tape(pos, this.head);
      this.head_pos = pos;
    } else console.log("move called with grammar version > 0");
  }
  moveM(pos: number) {
    if (this.gramm_v != 0) {
      this.move_tape(pos, this.headM);
      this.head_posM = pos;
    } else console.log("moveM called with grammar version 0");
  }
  moveW(pos: number) {
    if (this.gramm_v != 0) {
      this.move_tape(pos, this.headW);
      this.head_posW = pos;
    } else console.log("moveW called with grammar version 0");
  }
}
