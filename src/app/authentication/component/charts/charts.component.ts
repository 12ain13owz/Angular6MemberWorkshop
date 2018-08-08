import { Component, OnInit } from '@angular/core'
import { AppURL } from '../../../app.url'
import { AuthURL } from '../../authentication.url'

declare const $
declare const Chart

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css']
})

export class ChartsComponent implements OnInit {
  AppURL = AppURL
  AuthURL = AuthURL

  constructor() { }

  ngOnInit() {
    this.initialLoadCharts()
  }

  initialLoadCharts() {
    let data = {
      labels: ["January", "February", "March", "April", "May"],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86]
        }
      ]
    };
    let pdata = [
      {
        value: 300,
        color: "#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
      },
      {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
      },
      {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
      }
    ]

    let ctxl = $("#lineChartDemo").get(0).getContext("2d");
    let lineChart = new Chart(ctxl).Line(data);

    let ctxb = $("#barChartDemo").get(0).getContext("2d");
    let barChart = new Chart(ctxb).Bar(data);

    let ctxr = $("#radarChartDemo").get(0).getContext("2d");
    let radarChart = new Chart(ctxr).Radar(data);

    let ctxpo = $("#polarChartDemo").get(0).getContext("2d");
    let polarChart = new Chart(ctxpo).PolarArea(pdata);

    let ctxp = $("#pieChartDemo").get(0).getContext("2d");
    let pieChart = new Chart(ctxp).Pie(pdata);

    let ctxd = $("#doughnutChartDemo").get(0).getContext("2d");
    let doughnutChart = new Chart(ctxd).Doughnut(pdata);
  }

}
