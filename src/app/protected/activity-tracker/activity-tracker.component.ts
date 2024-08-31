import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivityTrackerService } from '../services/activity-tracker.service';
import { TokenService } from '../../auth/services/token.service';
import { PageEvent } from '@angular/material/paginator';
import { BaseChartDirective } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartOptions, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { MatDialog } from '@angular/material/dialog';
import { NewTrackerDialogComponent } from '../../shared-components/new-tracker-dialog/new-tracker-dialog.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-activity-tracker',
  templateUrl: './activity-tracker.component.html',
  styleUrl: './activity-tracker.component.css'
})
export class ActivityTrackerComponent implements OnInit {
  @ViewChild( BaseChartDirective ) chart: BaseChartDirective | undefined;
  trackers: any[] = [];
  allTrackers: any[] = [];
  user: any;
  pageSize = 6;
  currentPage = 0;
  totalTrackers = 0;

  public chartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Body weight',
        borderColor: 'rgba(63,81,181,255)',
        backgroundColor: 'rgba(130, 145, 226, 1)',
        fill: true,
      },
    ],
  };

  public chartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'month',
        },
      },
      y: {
        ticks: {
          stepSize: 5,
        },
      },
    },
  };

  constructor(
    private service: ActivityTrackerService,
    private tokenService: TokenService,
    private dialog: MatDialog
  ){
    Chart.register(...registerables);
  }

  ngOnInit(): void {
    this.user = this.tokenService.getUser();
    this.loadTrackers();
    this.loadAll();
  }

  loadTrackers(){
    this.service.getByUser(this.user.id, this.currentPage, this.pageSize).subscribe(data => {
      this.trackers = data.content;
      this.totalTrackers = data.totalElements;
    })
  }

  loadAll(){
    this.service.getAllByUser(this.user.id).subscribe(data => {
      console.log("Data", data);
      this.allTrackers = data;
      this.loadChart();
    })
  }

  isAddDisabled(){
    const today = new Date().toLocaleDateString('en-CA');
    return this.trackers.some(tracker => tracker.date === today);
  }

  loadChart() {
    this.chartData.labels = this.allTrackers.map((tracker) => tracker.date);
    this.chartData.datasets[0].data = this.allTrackers.map(
      (tracker) => tracker.bodyWeight
    );
    if (this.chart) {
      this.chart.update();
    }
  }

  paginate(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadTrackers();
  }

  openDialog(){
    let dialogRef = this.dialog.open(NewTrackerDialogComponent);

    dialogRef.afterClosed().subscribe(data => {
      if(data){
        this.loadTrackers();
        this.loadAll();
      }
    })
  }

  downloadPdf() {
    const chartElement = document.querySelector('.chart canvas') as HTMLCanvasElement;

    if (!chartElement) {
      console.error('Could not find chart element to print.');
      return;
    }

    const pdf = new jsPDF('p', 'mm', 'a4');
    let yOffset = 10;
    const lineHeight = 10;
    const margin = 10;
    const pageHeight = pdf.internal.pageSize.getHeight();
    console.log(pageHeight);
    const textHeight = 40;
    pdf.setFontSize(12);

    this.allTrackers.forEach((tracker) => {
      const text = `
        Activity tracker date: ${tracker.date}
        Exercise: ${tracker.exercise}
        Duration: ${tracker.duration} min
        Intensity: ${tracker.intensity}
        Result: ${tracker.result}
        Body weight: ${tracker.bodyWeight} kg
      `;
      pdf.text(text, margin, yOffset);
      yOffset += textHeight;
      console.log("yOffset ", yOffset);

      if ((yOffset + 10) > pageHeight) {
        console.log("uslo");
        pdf.addPage();
        yOffset = 10;
        pdf.setFontSize(12);
      }
    });

    const options = { scale: 2 };

    html2canvas(chartElement, options)
      .then((canvas) => {
        const imgWidth = 150;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        if (yOffset + imgHeight > pageHeight) {
          pdf.addPage();
          yOffset = 10;
        }

        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          10,
          yOffset,
          imgWidth,
          imgHeight
        );

        pdf.setProperties({
          title: 'Activity tracker PDF',
          subject: 'Activity tracker',
          author: 'FitnessApp',
        });

        pdf.save('activity-tracker.pdf');
      })
      .catch((error) => {
        console.error('Error generating PDF:', error);
      });
  }
}
