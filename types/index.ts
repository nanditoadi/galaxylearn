export interface Planet {
  id: string;
  name: string;
  type: string;
  image_url: string;
  description: string;
  diameter: string;
  temperature: string;
  distance_from_sun: string;
}

export interface PlanetFact {
  id: string;
  fact: string;
}

export interface SpaceObject {
  id: string;
  name: string;
  type: string;
  image_url: string;
  parent_planet?: { name: string }; 
}