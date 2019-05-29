import { Component, OnInit, ViewChild, AfterViewInit } from "@angular/core";
import { Exercise } from "../exercise.model";
import { TrainingService } from "../training.service";
import { MatSort, MatTableDataSource, MatPaginator } from "@angular/material";

@Component({
  selector: "app-past-training",
  templateUrl: "./past-training.component.html",
  styleUrls: ["./past-training.component.css"]
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns = ["date", "name", "duration", "calories", "state"];
  dataSource = new MatTableDataSource<Exercise>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.dataSource = this.trainingService.getCompletedOrCancelledExercises();
    console.log(this.dataSource);
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }
}
