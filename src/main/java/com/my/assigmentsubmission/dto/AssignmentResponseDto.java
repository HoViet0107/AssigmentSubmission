package com.my.assigmentsubmission.dto;

import com.my.assigmentsubmission.enums.AssignmentEnum;
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
    // cách 1
//    private List<AssignmentEnumDto> assignmentEnums = new ArrayList<>();

    // cách 2
    private AssignmentEnum[] assignmentEnums = AssignmentEnum.values();
    public AssignmentResponseDto(Assignment assignment) {
        super();
        this.assignment = assignment;
        // cách 1
//        Arrays.stream(AssignmentEnum.values()).forEach(assignmentEnum -> {
//            // convert enum to object and add to list
//            AssignmentEnumDto assignmentEnumsDto = new AssignmentEnumDto(assignmentEnum.getAssignmentName(), assignmentEnum.getAssignmentNum());
//            assignmentEnums.add(assignmentEnumsDto);
//        });
    }
}
