package com.my.assigmentsubmission.enums;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum AssignmentEnum {
    ASSIGNMENT_1(1,"Java Core"),
    ASSIGNMENT_2(2,"HTML/Scss"),
    ASSIGNMENT_3(3,"JavaScript"),
    ASSIGNMENT_4(4,"Sorting Algorithm"),
    ASSIGNMENT_5(5,"Custom Array List"),
    ASSIGNMENT_6(6,"Search Algorithm"),
    ASSIGNMENT_7(7,"Unit Testing"),
    ASSIGNMENT_8(8,"Spring Core"),
    ASSIGNMENT_9(9,"Spring MVC"),
    ASSIGNMENT_10(10,"RESTfull Service"),
    ASSIGNMENT_11(11,"FullStack with Thymeleaf"),
    ASSIGNMENT_12(12,"Reports with SQL"),
    ASSIGNMENT_13(13,"Assignment App"),
    ASSIGNMENT_14(14,"Social App");

    @Getter
    private final Integer assignmentNum;
    @Getter
    private String assignmentName;

    AssignmentEnum(int assignmentNum, String assignmentName) {
        this.assignmentNum = assignmentNum;
        this.assignmentName = assignmentName;
    }
}
