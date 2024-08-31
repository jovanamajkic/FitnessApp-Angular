import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-dialog',
  templateUrl: './video-dialog.component.html',
  styleUrl: './video-dialog.component.css'
})
export class VideoDialogComponent {
  sanitizedVideoUrl: SafeResourceUrl;
  
  constructor(
    public dialogRef: MatDialogRef<VideoDialogComponent>,
    private sanitizer: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: { videoUrl: string }
  ){
    this.sanitizedVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.getEmbedUrl());
  }

  getEmbedUrl(): string {
    return this.data.videoUrl.replace('watch?v=', 'embed/');
  }
}
