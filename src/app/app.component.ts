import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject, concatMap, first, forkJoin, map, mergeMap, reduce, switchMap, take, filter, takeWhile, every, find, findIndex, isEmpty, max, min, count, tap, delay, partition, last, takeLast, startWith, endWith, Observable } from 'rxjs';
import { SharedService } from './shared.service';

export interface Model {
  "id": number;
  "userId": number;
  "title": string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  providers: [SharedService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'rxjs-operators';

  private $destroy = new Subject();
  public userId?: number;

  constructor(private readonly shared: SharedService, private readonly http: HttpClient) {
  }

  ngOnInit(): void {
    // Map
    let mapOp = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), map((data: any) => {
      return {
        userId: data.userId,
        id: data.id * 10
      }
    }))
    //Filter
    let filterOpe: Observable<any> = this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), filter((data: any) => data.userId == 2), findIndex((data: any) => data.userId == 2));
    // IsEmpty
    let isEmptyOpera: Observable<any> = this.shared.getPostAlbums().pipe(isEmpty());

    // Max
    let maximum: Observable<any> = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), max((a: any, b: any) => a.id < b.id ? -1 : 1))
    // Reduce
    let reduceOp: Observable<any> = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), reduce((a: any, b: any) => Number(a.id) + Number(b.id)))

    // Min
    let minimim = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), min((a: any, b: any) => a.id < b.id ? -1 : 1))

    // Count
    let countOp: Observable<any> = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), count((data: any) => data.userId % 5 == 0))

    // Tap
    let tapOp: Observable<any> = this.shared.getPostAlbums().pipe(delay(2000), tap((data: any) => data))

    // ForkJoin
    const posts = this.http.get(`https://jsonplaceholder.typicode.com/posts`);
    const albums = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    const album = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    let fork = forkJoin([posts, albums, album]).pipe(take(1));

    // Mergemap
    let mergeMapOp = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), filter((data: any) => data.id == 10), mergeMap((data) => this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${data.userId}`)));


    // SwitchMap
    let switchOp = this.shared.getPostAlbums().pipe(switchMap((element1) => {
      return this.shared.getPostsData().pipe(map((element2) => ({ element1, element2 })))
    }))

    // First
    let firstOp = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), first());

    // Last
    let lastOp = this.shared.getPostAlbums().pipe(switchMap((data: any) => data), last())

    // Take
    let takeOp = this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), take(10))

    // TakeLast
    let takeLastOp = this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), takeLast(10))

    // TakeWhile
    let takeWhileOp = this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), filter((data: any) => data.userId == 5), takeWhile((data: any) => data.id == 41))

    // startWith
    let start = this.shared.getPostAlbums().pipe(map((data: any) => data), startWith('Welcome'))

    // endWith
    let end = this.shared.getPostAlbums().pipe(map((data: any) => data), endWith('Welcome'));

    // Find
    let findOp = this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), find((data: any) => data.userId == 10));

    // FindIndex
    let findIndexOp=this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), findIndex((data: any) => data.userId == 10));

    findIndexOp.subscribe((data) => console.log(data));

  }

  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
