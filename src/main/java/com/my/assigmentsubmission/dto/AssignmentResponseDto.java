package com.my.assigmentsubmission.dto;

import com.my.assigmentsubmission.enums.AssignmentEnum;
import com.my.assigmentsubmission.enums.AssignmentStatusEnum;
import com.my.assigmentsubmission.model.Assignment;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Getter
@Setter
public class AssignmentResponseDto {
    private Assignment assignment;

    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    private AssignmentStatusEnum[] assignmentStatusEnums = AssignmentStatusEnum.values();

    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
    }
}
