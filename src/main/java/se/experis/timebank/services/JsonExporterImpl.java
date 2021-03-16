package se.experis.timebank.services;

import java.util.List;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.stereotype.Service;
import se.experis.timebank.models.VacationRequest;
import se.experis.timebank.utils.JsonExporter;


@Service
public class JsonExporterImpl implements JsonExporter {


    @Override
    public String export(List<VacationRequest> requests) {
        ObjectMapper mapper = new ObjectMapper();
        mapper.registerModule(new JavaTimeModule());
        try{
            return mapper.writerWithDefaultPrettyPrinter().writeValueAsString(requests);
        }
        catch(JsonProcessingException e){
        }
        return null;
    }
}
