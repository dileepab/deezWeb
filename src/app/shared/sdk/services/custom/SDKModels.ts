/* tslint:disable */
import { Injectable } from '@angular/core';
import { Role } from '../../models/Role';
import { Cut } from '../../models/Cut';
import { AppUser } from '../../models/AppUser';
import { Attendance } from '../../models/Attendance';
import { Employee } from '../../models/Employee';
import { Holiday } from '../../models/Holiday';
import { OverTime } from '../../models/OverTime';
import { Email } from '../../models/Email';
import { Pattern } from '../../models/Pattern';
import { Container } from '../../models/Container';
import { SpWorkingDay } from '../../models/SpWorkingDay';
import { ImageFile } from '../../models/ImageFile';
import { Target } from '../../models/Target';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Role: Role,
    Cut: Cut,
    AppUser: AppUser,
    Attendance: Attendance,
    Employee: Employee,
    Holiday: Holiday,
    OverTime: OverTime,
    Email: Email,
    Pattern: Pattern,
    Container: Container,
    SpWorkingDay: SpWorkingDay,
    ImageFile: ImageFile,
    Target: Target,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
