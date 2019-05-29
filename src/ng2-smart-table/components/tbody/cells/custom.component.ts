import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Row } from '../../../lib/data-set/row';

import { Grid } from '../../../lib/grid';

@Component({
  selector: 'ng2-st-tbody-custom',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <ng-container *ngFor="let action of grid.getSetting('actions.custom')">
      <a href="#" class="ng2-smart-action ng2-smart-action-custom-custom"
         *ngIf="!action.renderComponent"
         [innerHTML]="action.title"
         (click)="onCustom(action, $event)"></a>
      <ng2-st-tbody-custom-item class="ng2-smart-action ng2-smart-action-custom-custom"
                                *ngIf="action.renderComponent"
                                [action]="action"
                                [row]="row"
                                (click)="onCustom(action, $event)"></ng2-st-tbody-custom-item>
    </ng-container>
  `,
})
export class TbodyCustomComponent {

  @Input() grid: Grid;
  @Input() row: Row;
  @Input() source: any;
  @Output() custom = new EventEmitter<any>();

  onCustom(action: any, event: any) {
    event.preventDefault();
    event.stopPropagation();

    this.custom.emit({
      action: action.name,
      data: this.row.getData(),
      source: this.source,
    });
  }

}
