package com.my.assigmentsubmission.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AssignmentEnumDto {
    private String assignmentName;
    private Integer assignmentNum;

    public AssignmentEnumDto(String assignmentName, Integer assignmentNum) {
        this.assignmentName = assignmentName;
        this.assignmentNum = assignmentNum;
    }
}
