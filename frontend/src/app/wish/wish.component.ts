import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Wish} from '../common/models/wish.model';

@Component({
  selector: 'app-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.css']
})
export class WishComponent implements OnInit {

  @Input() wish: Wish;
  @Output() emitDeleteEvent = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  deleteWish(wish: Wish) {
    this.emitDeleteEvent.emit(wish);
  }

}
