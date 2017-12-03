import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { MockDataBarChart, MockDataPieChart } from '../../mock-data/mock-data';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Shape from 'd3-shape';
import * as d3Axis from 'd3-axis';
import * as d3Array from 'd3-array';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
	
	width: number;
  height: number;
  radius: number;
  margin = {top: 20, right: 20, bottom: 30, left: 40};

  x: any;
  y: any;
  svg: any;
  g: any;

  arc: any;
  labelArc: any;
  labelPer: any;
  pie: any;
  color: any;

  constructor(public navCtrl: NavController) {
    this.width = 900 - this.margin.left - this.margin.right ;
    this.height = 500 - this.margin.top - this.margin.bottom;
    this.radius = Math.min(this.width, this.height) / 2;
  }

  ionViewDidLoad() {
    this.initSvg()
    this.initAxis();
    this.drawAxis();
    this.drawBars();
    this.drawPie();
  }

  initSvg() {

    this.svg = d3.select("#barChart")
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 900 500');
    this.g = this.svg.append("g")
        .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    this.color = d3Scale.scaleOrdinal()
        .range(["#FFA500", "#00FF00", "#FF0000", "#6b486b", "#FF00FF", "#d0743c", "#00FA9A"]);
    this.arc = d3Shape.arc()
        .outerRadius(this.radius - 10)
        .innerRadius(0);
    this.labelArc = d3Shape.arc()
        .outerRadius(this.radius - 40)
        .innerRadius(this.radius - 40);
    
    this.labelPer = d3Shape.arc()
        .outerRadius(this.radius -80)
        .innerRadius(this.radius -80);
    

    this.pie = d3Shape.pie()
        .sort(null)
        .value((d: any) => d.energyConsumptionP);

    this.svg = d3.select("#pieChart")
        .append("svg")
        .attr("width", '100%')
        .attr("height", '100%')
        .attr('viewBox','0 0 '+Math.min(this.width,this.height)+' '+Math.min(this.width,this.height))
        .append("g")
        .attr("transform", "translate(" + Math.min(this.width,this.height) / 2 + "," + Math.min(this.width,this.height) / 2 + ")");
  }

  initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(MockDataBarChart.map((d) => d.room));
    this.y.domain([0, d3Array.max(MockDataBarChart, (d) => d.kwh)]);
  }

  drawAxis() {
    this.g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", "translate(0," + this.height + ")")
        .call(d3Axis.axisBottom(this.x));
    this.g.append("g")
        .attr("class", "axis axis--y")
        .call(d3Axis.axisLeft(this.y))
        .append("text")
        .attr("class", "axis-title")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text("KWH");
  }

  drawBars() {
    this.g.selectAll(".bar")
        .data(MockDataBarChart)
        .enter().append("rect")
        .attr("class", "bar")
        .attr("x", (d) => this.x(d.room) )
        .attr("y", (d) => this.y(d.kwh) )
        .attr("width", this.x.bandwidth())
        .attr("height", (d) => this.height - this.y(d.kwh) );
  }

  drawPie() {
    let g = this.svg.selectAll(".arc")
        .data(this.pie(MockDataPieChart))
        .enter().append("g")
        .attr("class", "arc");
    g.append("path").attr("d", this.arc)
        .style("fill", (d: any) => this.color(d.data.room) );
    g.append("text").attr("transform", (d: any) => "translate(" + this.labelArc.centroid(d) + ")")
        .attr("dy", ".35em")
        .text((d: any) => d.data.room);

    g.append("text").attr("transform", (d: any) => "translate(" + this.labelPer.centroid(d) + ")")
        .attr("dy", ".35em")
        .text((d: any) => d.data.energyConsumptionP + "%");
  }

}