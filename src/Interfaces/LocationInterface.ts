export interface Encounters {
    location_area:   LocationArea;
    version_details: VersionDetail[];
}

export type LocationArea = {
    name: string;
    url:  string;
}

export type VersionDetail = {
    location_area: any;
    encounter_details: EncounterDetail[];
    max_chance:        number;
    version:           LocationArea;
}

export type EncounterDetail = {
    chance:           number;
    condition_values: LocationArea[];
    max_level:        number;
    method:           LocationArea;
    min_level:        number;
}
