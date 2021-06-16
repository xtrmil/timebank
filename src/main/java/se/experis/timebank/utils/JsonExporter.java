package se.experis.timebank.utils;

import java.util.List;

import se.experis.timebank.models.VacationRequest;

public interface JsonExporter {
    String export(List<VacationRequest> requests);
}
