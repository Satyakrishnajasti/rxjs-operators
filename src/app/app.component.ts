import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subject, concatMap, first, forkJoin, map, mergeMap, reduce, switchMap, take, filter, takeWhile, every, find, findIndex, isEmpty, max, min, count, tap, delay, partition, last, takeLast } from 'rxjs';
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
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), map((data: any) => {
      return {
        userId: data.userId,
        id: data.id * 10
      }
    })).subscribe((data) => console.log(data));
    //Filter
    this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), filter((data: any) => data.userId == 2), findIndex((data: any) => data.userId == 2)).subscribe((data) => console.log(`Filter ` + data));

    // IsEmpty
    this.shared.getPostAlbums().pipe(isEmpty()).subscribe((data) => console.log(`isEmpty ` + data));

    // Max
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), max((a: any, b: any) => a.id < b.id ? -1 : 1)).subscribe((data) => console.log(data));
    // Reduce
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), reduce((a: any, b: any) => Number(a.id) + Number(b.id))).subscribe((data) => console.log(`reduce ` + data));

    // Min
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), min((a: any, b: any) => a.id < b.id ? -1 : 1)).subscribe((data) => console.log(data));

    // Count
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), count((data: any) => data.userId % 5 == 0)).subscribe((data) => console.log(data));

    // Tap
    this.shared.getPostAlbums().pipe(delay(2000), tap((data: any) => data)).subscribe((data) => console.log(data));

    // ForkJoin
    const posts = this.http.get(`https://jsonplaceholder.typicode.com/posts`);
    const albums = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    const album = this.http.get(`https://jsonplaceholder.typicode.com/albums`);
    forkJoin([posts, albums, album]).pipe(take(1)).subscribe((data) => console.log(data));

    // Mergemap
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), filter((data: any) => data.id == 10), mergeMap((data) => this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${data.userId}`))).subscribe((data) => console.log(data));

    // SwitchMap
    this.shared.getPostAlbums().pipe(switchMap((element1) => {
      return this.shared.getPostsData().pipe(map((element2) => ({ element1, element2 })))
    })).subscribe((data) => console.log(data));

    // First
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), first()).subscribe((data) => console.log(data));

    // Last
    this.shared.getPostAlbums().pipe(switchMap((data: any) => data), last()).subscribe((data) => console.log(data));

    // Take
    this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), take(10)).subscribe((data) => console.log(data));

    // TakeLast
    this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), takeLast(10)).subscribe((data) => console.log(data));

    // TakeWhile
    this.shared.getPostAlbums().pipe(mergeMap((data: any) => data), filter((data: any) => data.userId == 5), takeWhile((data: any) => data.id == 41)).subscribe((data) => console.log(data));

    // startWith
    
    // endWith


  }

  ngOnDestroy(): void {
    this.$destroy.next(undefined);
    this.$destroy.complete();
  }
}
