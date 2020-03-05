import { PipeTransform, BadRequestException } from "@nestjs/common";
import { TaskStatus } from "../task-status.enum";

export class TaskStatusValidationPipe implements PipeTransform {
    readonly allowedStatus = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.DONE
    ]
    transform(value: any) {
        value = value.toUpperCase()

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invlid status`)
        }
        return value;
    }

    private isStatusValid(status) {
        const idx = this.allowedStatus.indexOf(status);
        return idx !== -1; // true is the status is found
    }
}