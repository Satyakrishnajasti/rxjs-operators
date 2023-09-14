import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import {
  Subject,
  concatMap,
  first,
  forkJoin,
  map,
  mergeMap,
  reduce,
  switchMap,
  take,
  filter,
  takeWhile,
  every,
  find,
  findIndex,
  isEmpty,
  max,
  min,
  count,
  tap,
  delay,
  partition,
  last,
  takeLast,
  startWith,
  endWith,
  Observable,
  distinct,
  from,
  range,
  of,
  interval,
  combineLatest,
  concat,
  skip,
  merge,
  skipLast,
  skipWhile,
  single,
  elementAt,
  distinctUntilChanged,
  ignoreElements,
  exhaustMap,
  debounceTime,
  mapTo,
  pairwise,
  pluck,
  groupBy,
  toArray,
  windowCount,
  audit,
  auditTime,
  sample
} from 'rxjs';
import { SharedService } from './shared.service';
import { SubjectComponent } from './subject/subject.component';

export interface Model {
  id: number;
  userId: number;
  title: string;
}

export interface Operators {
  name: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SubjectComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [SharedService],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-operators';

  protected shared = inject(SharedService);

  private $destroy = new Subject();
  public userId?: number;

  protected Operators: { name: string }[] = [
    {
      name: 'filter',
    },
    {
      name: 'isEmpty',
    },
    {
      name: 'max',
    },
    {
      name: 'min',
    },
    {
      name: 'reduce',
    },
    {
      name: 'count',
    },
    {
      name: 'tap',
    },
    {
      name: 'forkJoin',
    },
    {
      name: 'mergeMap',
    },
    {
      name: 'switchMap',
    },
    {
      name: 'first',
    },
    {
      name: 'last',
    },
    {
      name: 'take',
    },
    {
      name: 'takeLast',
    },
    {
      name: 'takeWhile',
    },
    {
      name: 'startWith',
    },
    {
      name: 'endWith',
    },
    {
      name: 'find',
    },
    {
      name: 'findIndex',
    },
    {
      name: 'distinct',
    },
    {
      name: 'from',
    },
    {
      name: 'range',
    },
    {
      name: 'interval',
    },
    {
      name: 'of',
    },
    {
      name: 'combineLatest',
    },
    {
      name: 'delay',
    },
    {
      name: 'concat',
    },
    {
      name: 'skip'
    },
    {
      name: 'skipLast'
    },
    {
      name: 'merge'
    },
    {
      name: 'partition'
    },
    {
      name: 'elementAt'
    },
    {
      name: 'distinctUntilChanged'
    },
    {
      name: 'ignoreElements'
    },
    {
      name: 'concatMap'
    },
    {
      name: 'exhaustMap'
    },
    {
      name: 'debounceTime'
    },
    {
      name: 'mapTo'
    },
    {
      name: 'pluck'
    },
    {
      name: 'pairwise'
    },
    {
      name: 'groupBy'
    }
  ];

  constructor(
    private readonly http: HttpClient
  ) { }

  ngOnInit(): void {
    // Map
    let mapOp = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      map((data: any) => {
        return {
          userId: data.userId,
          id: data.id * 10,
        };
      })
    );
    //Filter
    let filterOpe: Observable<any> = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      filter((data: any) => data.userId == 2),
      findIndex((data: any) => data.userId == 2)
    );
    // IsEmpty
    let isEmptyOpera: Observable<any> = this.shared
      .getPostAlbums()
      .pipe(isEmpty());

    // Max
    let maximum: Observable<any> = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      max((a: any, b: any) => (a.id < b.id ? -1 : 1))
    );
    // Reduce
    let reduceOp: Observable<any> = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      reduce((a: any, b: any) => Number(a) + Number(b.userId), 0)
    );

    // Min
    let minimim = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      min((a: any, b: any) => (a.id < b.id ? -1 : 1))
    );

    // Count
    let countOp: Observable<any> = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      count((data: any) => data.userId % 5 == 0)
    );

    // Tap
    let tapOp: Observable<any> = this.shared.getPostAlbums().pipe(
      delay(2000),
      tap((data: any) => data)
    );

    // ForkJoin
    const posts = this.http.get(`https://jsonplaceholder.typicode.com/posts`);
    const albums = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    const album = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    let fork = forkJoin([posts, albums, album]).pipe(take(1));

    // Mergemap
    let mergeMapOp = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      filter((data: any) => data.id == 10),
      mergeMap((data) =>
        this.http.get(
          `https://jsonplaceholder.typicode.com/posts?userId=${data.userId}`
        )
      )
    );

    // SwitchMap
    let switchOp = this.shared.getPostAlbums().pipe(
      switchMap((element1) => {
        return this.shared
          .getPostsData()
          .pipe(map((element2) => ({ element1, element2 })));
      })
    );

    // First
    let firstOp = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      first()
    );

    // Last
    let lastOp = this.shared.getPostAlbums().pipe(
      switchMap((data: any) => data),
      last()
    );

    // Take
    let takeOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      take(10)
    );

    // TakeLast
    let takeLastOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      takeLast(10)
    );

    // TakeWhile
    let takeWhileOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      filter((data: any) => data.userId == 5),
      takeWhile((data: any) => data.id == 41)
    );

    // startWith
    let start = this.shared.getPostAlbums().pipe(
      map((data: any) => data),
      startWith('Welcome')
    );

    // endWith
    let end = this.shared.getPostAlbums().pipe(
      map((data: any) => data),
      endWith('Welcome')
    );

    // Find
    let findOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      find((data: any) => data.userId == 10)
    );

    // FindIndex
    let findIndexOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      findIndex((data: any) => data.userId == 10)
    );

    // Distinct
    let distinctOp = this.shared.getPostAlbums().pipe(
      mergeMap((data: any) => data),
      distinct((data: any) => data.userId)
    );

    //From
    let fruits = from([{ name: 'Apple' }, { name: 'Mango' }]);

    // range
    let numbers = range(1, 100);

    // of
    let off = of(1, 2, 3, 4);

    // Interval
    let interVal = interval(100);

    // CombineLatest
    let combine = combineLatest([album, posts, albums]);

    // delay
    let d = range(1, 10).pipe(delay(5000));

    // concat
    let post = this.shared.getPostAlbums();
    let albumss = this.shared.getPostsData();
    let result = concat(post, albumss);

    let data = of(
      [
        {
          'name': 'hello'
        },
        {
          'name': 'welcome'
        }
      ]);

    // this.shared.getTodos().pipe(switchMap((data: any) => data), filter((val: any) => {
    //   return val?.id === 1
    // })).subscribe((data) => console.log(data));

    // of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10)
    //   .pipe(
    //     filter(val => {
    //       return val % 2 == 0;
    //     }),
    //   )
    //   .subscribe(val => console.log(val));

    // Skip
    let skipOp = range(1, 100);

    // SkipLast
    let skipLastOp = this.shared.getPostsData().pipe(mergeMap((element: any) => element), skipLast(80));

    // SkipWhile
    let skipWhileOp = this.shared.getPostAlbums().pipe(switchMap((element: any) => element), tap((element) => (element)), skipWhile((element: any, index) => {
      if (element.userId && element.id) {
        console.log(element.userId);
      }
      return Number(element.userId) > 3 && (element.id) == 1;
    }));

    //merge
    let item1 = this.shared.getPostAlbums();
    let item2 = this.shared.getPostsData();

    const merged = merge(item1, item2);

    // Partition
    let part = this.shared.getPostAlbums();
    part.subscribe((data: any) => {
      const [even, odd] = partition(data, (value: any, index: number) => index > 0 && index < 10);
      even.subscribe((data) => (data));
      odd.subscribe((data) => (data));
    });

    //elementAt
    let element = this.shared.getPostAlbums();
    element.pipe(concatMap((element: any) => element), tap((element) => (element)), elementAt(15)).subscribe((data) => data);

    //distinctUntilChanged
    let dup = this.shared.getPostAlbums();
    dup.pipe(switchMap((element: any) => element), distinctUntilChanged((prev: any, curr: any): any => {
      return (
        prev.id === curr.id || prev.userId === curr.userId
      )
    })).subscribe((data) => data);

    // switchMap
    this.shared.getPostAlbums().pipe(switchMap((element1) => this.shared.getPostsData().pipe(map((element2) => ({ element1, element2 }))))).subscribe((data) => (data));
    this.shared.getPostAlbums().pipe(switchMap((element1) => this.shared.getPostsData().pipe(switchMap((elementt2) => this.shared.getTodos().pipe(map((element3) => ({ element1, elementt2, element3 }))))))).subscribe((data) => (data));

    // //ignoreElements
    let ignore = this.shared.getPostAlbums();

    ignore.pipe(ignoreElements()).subscribe({
      next: (value) => value,
      error: (err) => (err),
      complete: () => ('ignoreElements')
    });

    //switchMap, mergeMap, concatMap, exhaustMap,

    //   -🤯mergeMap: I'm a hard worker, I can prepare multiple orders at the same time ! But I don't respect orders sequence.

    // -😇concatMap: I respect orders sequence! You will get your order as soon as I finish what I'm currently doing.

    // -🙄exhaustMap: I'm exhausted ! when I prepare an order, I won't listen to any other order.

    // -😈switchMap: I'm mean ! your order will be in trash if I receive new one.
    //this.orders.pipe(concatMap((order) => this.prepOrder(order))).subscribe((data) => console.log(data));

    from([1, 2, 3]).pipe((concatMap((element) => this.http.get('https://jsonplaceholder.typicode.com/posts/' + element)))).subscribe((data) => data);

    // debounceTime
    let debounce = from([1, 2, 3, 4, 5]).pipe(debounceTime(20000)).subscribe((data) => console.log(data));

    // mapTo
    let mapto = this.shared.getPostAlbums().pipe(concatMap((data: any) => data), mapTo('Welcome')).subscribe((data) => (data));

    // pairwise
    let pairwiseop = this.shared.getPostAlbums().pipe(concatMap((data: any) => data), pairwise(), map(([from, to]: any) => Math.abs(Number(from.id) + Number(to.id))), map((data) => {
      return {
        id: data
      }
    })).subscribe((data) => (data));

    // pluck
    this.shared.getPostAlbums().pipe(concatMap((data: any) => data), pluck('userId')).subscribe((data) => (data));

    //groupBy
    this.shared.getPostAlbums().pipe(concatMap((data: any) => data), groupBy((data: any) => data.userId), mergeMap((data) => data.pipe(toArray()))).subscribe((data) => (data));

    //audit
    // this.shared.getNews().pipe(audit((element) => interval(1000))).subscribe((data) => console.log(data));
    range(1, 100).pipe(audit((e) => interval(5000))).subscribe((data) => console.log(data));

    //auditTime
    range(1, 100).pipe(auditTime(10000)).subscribe((data) => console.log(data));
  }

  private prepOrder(order: any) {
    const deplayTime = Math.floor(Math.random() * 1000) + 1;
    return of(`I'm ${order} I'm order after ${deplayTime} ms`).pipe(delay(deplayTime));
  }
  orders = from(['Order 1', 'Order 2', "Order 3", "Order 4"]);


  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
