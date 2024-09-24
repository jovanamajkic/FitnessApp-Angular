import { Component, OnInit } from '@angular/core';
import { RssFeedService } from '../services/rss-feed.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  feed: any[] = [];
  feedPage: any[] = [];

  pageSize = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  pageEvent: any;

  constructor(
    private rssFeedService: RssFeedService
  ) { }

  ngOnInit(): void {
    this.rssFeedService.getFeedData().subscribe({
      next: (data) => {
        this.feed = data.rss.channel.item;
        this.feedPage = this.feed.slice(0, this.pageSize);
      },
      error: (error) => {
        console.error('Error loading feed data:', error);
      }
    });
  }

  handlePageEvent(event: PageEvent) {
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    this.feedPage = this.feed.slice(startIndex, endIndex);
  }
}
