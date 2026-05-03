var countries = [
  { code: 'USA', name: 'United States', continent: 'Americas', gdpPerCapita: 80035, population: 335, lifeExp: 79.1, growth: 2.5 },
  { code: 'CHN', name: 'China',         continent: 'Asia',     gdpPerCapita: 12541, population: 1412, lifeExp: 78.2, growth: 5.2 },
  { code: 'DEU', name: 'Germany',       continent: 'Europe',   gdpPerCapita: 53270, population: 84,   lifeExp: 81.0, growth: -0.3 },
  { code: 'JPN', name: 'Japan',         continent: 'Asia',     gdpPerCapita: 33815, population: 125,  lifeExp: 84.3, growth: 1.9 },
  { code: 'IND', name: 'India',         continent: 'Asia',     gdpPerCapita: 2601,  population: 1435, lifeExp: 70.4, growth: 6.3 },
  { code: 'GBR', name: 'United Kingdom',continent: 'Europe',   gdpPerCapita: 45295, population: 68,   lifeExp: 81.0, growth: 0.4 },
  { code: 'FRA', name: 'France',        continent: 'Europe',   gdpPerCapita: 44408, population: 68,   lifeExp: 82.3, growth: 0.9 },
  { code: 'BRA', name: 'Brazil',        continent: 'Americas', gdpPerCapita: 10279, population: 215,  lifeExp: 75.5, growth: 2.9 },
  { code: 'ITA', name: 'Italy',         continent: 'Europe',   gdpPerCapita: 37146, population: 59,   lifeExp: 83.4, growth: 0.7 },
  { code: 'CAN', name: 'Canada',        continent: 'Americas', gdpPerCapita: 54966, population: 39,   lifeExp: 82.0, growth: 1.1 },
  { code: 'RUS', name: 'Russia',        continent: 'Europe',   gdpPerCapita: 12895, population: 145,  lifeExp: 73.4, growth: 3.6 },
  { code: 'KOR', name: 'South Korea',   continent: 'Asia',     gdpPerCapita: 32422, population: 52,   lifeExp: 83.5, growth: 1.4 },
  { code: 'AUS', name: 'Australia',     continent: 'Oceania',  gdpPerCapita: 64675, population: 26,   lifeExp: 83.2, growth: 2.0 },
  { code: 'MEX', name: 'Mexico',        continent: 'Americas', gdpPerCapita: 10046, population: 130,  lifeExp: 75.1, growth: 3.1 },
  { code: 'IDN', name: 'Indonesia',     continent: 'Asia',     gdpPerCapita: 4788,  population: 277,  lifeExp: 68.1, growth: 5.0 },
  { code: 'NGA', name: 'Nigeria',       continent: 'Africa',   gdpPerCapita: 2065,  population: 223,  lifeExp: 55.7, growth: 2.9 },
  { code: 'ZAF', name: 'South Africa',  continent: 'Africa',   gdpPerCapita: 6332,  population: 60,   lifeExp: 64.9, growth: 0.6 },
  { code: 'ARG', name: 'Argentina',     continent: 'Americas', gdpPerCapita: 13473, population: 46,   lifeExp: 76.7, growth: -2.5 },
  { code: 'SAU', name: 'Saudi Arabia',  continent: 'Asia',     gdpPerCapita: 30436, population: 36,   lifeExp: 76.5, growth: 0.8 },
  { code: 'TUR', name: 'Turkey',        continent: 'Europe',   gdpPerCapita: 12065, population: 85,   lifeExp: 76.6, growth: 4.5 }
];

var years = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2022, 2024];
var worldPop = [5.33, 5.74, 6.09, 6.49, 6.93, 7.38, 7.79, 7.98, 8.10];
var worldGDP = [23.1, 30.7, 33.9, 46.9, 66.1, 75.0, 85.1, 100.3, 105.0];

var regions   = ['N. America', 'Europe', 'Asia-Pacific', 'Lat. America', 'Africa'];
var gdp2000   = [12.1, 10.2, 8.2, 2.1, 0.6];
var gdp2010   = [16.0, 18.2, 22.1, 4.5, 1.8];
var gdp2024   = [31.5, 24.2, 38.5, 6.8, 3.2];

var animYears = [2000, 2002, 2004, 2006, 2008, 2010, 2012, 2014, 2016, 2018, 2020, 2022, 2024];
var usaGDP  = [10.5, 11.1, 12.2, 13.9, 14.7, 15.0, 16.2, 17.4, 18.7, 20.5, 21.0, 25.5, 27.4];
var chinaGDP= [1.2,  1.5,  1.9,  2.7,  4.6,  6.1,  8.5,  10.4, 11.2, 13.9, 14.7, 17.9, 17.7];
var indiaGDP= [0.5,  0.5,  0.7,  0.9,  1.2,  1.7,  2.0,  2.0,  2.3,  2.7,  2.7,  3.4,  3.7];
var jpnGDP  = [4.9,  4.1,  4.7,  4.4,  5.1,  5.7,  6.2,  4.9,  5.0,  5.0,  5.0,  4.2,  4.2];
