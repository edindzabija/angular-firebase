import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  exercises: Exercise[];
  isLoading = true;
  private exerciseSubscription: Subscription;
  private loadingSubscription: Subscription;

  constructor(
    private trainingService: TrainingService,
    private uiService: UIService
  ) {}

  ngOnInit(): void {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );
    this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises) => {
        this.exercises = exercises;
      }
    );
    this.fetchExercises();
  }
  
  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
  }
}
