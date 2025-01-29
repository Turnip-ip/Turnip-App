
export class Tape {

  constructor(gramm_ver, elem) {
    var i;
    switch(gramm_ver) {
    case 0:
      this.gramm_v = 0;
      this.head = elem._value.getElementsByTagName("tape_head")[0];
      this.head_pos = null;
      this.tape = elem._value.getElementsByTagName("tr")[0];
      break;
    case 1:
      this.gramm_v = 1;
      this.tapeM = elem._value.getElementsByTagName("tr")[0];
      this.tapeW = elem._value.getElementsByTagName("tr")[1];
      this.head_posM = null;
      this.head_posW = null;
      this.headM = elem._value.getElementsByTagName("tape_head")[0];
      this.headW = elem._value.getElementsByTagName("tape_head")[1];
      break;
    case 2:
      // +++ we need size max...
      this.gramm_v = 2;
      this.tapeM = elem._value.getElementsByTagName("tr")[0];
      this.tapeW = elem._value.getElementsByTagName("tr")[1];
      this.head_posM = null;
      this.head_posW = null;
      this.headM = elem._value.getElementsByTagName("tape_head")[0];
      this.headW = elem._value.getElementsByTagName("tape_head")[1];
      break;
    } 
  }

  write_tape(str, tape) {
    // write one character per cell
    var children = tape.children;
    if (children.length < str.length) {
      console.log("write with str too long");
      return ;
    }
    for (var i = 0; i < children.length; i++) {
      if (children[i].textContent != str[i]) {
        this.write_fade(children[i], str[i]);
      }
    }
  }

  write_fade(div, cont) {
    div.style.opacity = 0;
    setTimeout(() => {
      div.textContent = cont;
      div.style.opacity = 1;
    }, 100);
  }

  write(str) {
    if (this.gramm_v == 0) this.write_tape(str, this.tape);
    else console.log('write called with grammar version > 0');
  }
  writeM(str) {
    if (this.gramm_v != 0) this.write_tape(str, this.tapeM);
    else console.log('writeM called with grammar version 0');
  }
  writeW(str) {
    if (this.gramm_v != 0) this.write_tape(str, this.tapeW);
    else console.log('writeW called with grammar version 0');
  }

  move_tape(pos, tape, head_pos, head) {
    head.style.marginLeft = 50*pos+"px";
  }

  move(pos) {
    if (this.gramm_v == 0) {
      this.move_tape(pos, this.tape, this.head_pos, this.head);
      this.head_pos = pos;
    }
    else console.log('move called with grammar version > 0');
  }
  moveM(pos) {
    if (this.gramm_v != 0) {
      this.move_tape(pos, this.tapeM, this.head_posM, this.headM);
      this.head_posM = pos;
    }
    else console.log('moveM called with grammar version 0');
  }
  moveW(pos) {
    if (this.gramm_v != 0) {
      this.move_tape(pos, this.tapeW, this.head_posW, this.headW);
      this.head_posW = pos;
    }
    else console.log('moveW called with grammar version 0');
  }
}

