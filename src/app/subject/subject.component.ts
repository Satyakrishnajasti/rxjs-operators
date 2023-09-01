import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subject, BehaviorSubject, ReplaySubject, AsyncSubject } from 'rxjs';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.sass']
})
export class SubjectComponent implements OnInit {


  ngOnInit(): void {


    const behavior = new BehaviorSubject<number>(1);
    behavior.next(2)
    behavior.subscribe((data) => (data));

    const replay = new ReplaySubject(3); // buffer 3 values for new subscribers
    replay.next(1);
    replay.next(2);
    replay.next(3);
    replay.next(4);

    replay.subscribe({
      next: (v) => {
        console.log(`observerA: ${v}`)
      },
    });

    const async = new AsyncSubject();
    async.next(1);
    async.next(2);
    async.next(3);
    async.complete();

    async.subscribe((data) => console.log(data));


  }

}
