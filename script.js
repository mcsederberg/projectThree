let app = new Vue({
    el: '#app',
    data: {
        loading: false,
        superheroes: [],
        name: '',
        error: false,
        superhero: {
            id: '',
            name: '',
            powerstats: {
                intelligence: '',
                strength: '',
                speed: '',
                durability: '',
                power: '',
                combat: ''
            },
            biography: {
                fullName: '',
                alterEgos: '',
                aliases: [],
                placeOfBirth: '',
                firstAppearance: '',
                publisher: '',
                alignment: ''
            },
            appearance: {
                gender: '',
                race: '',
                height: [],
                weight: [],
                eyeColor: '',
                hairColor: '',
            },
            work: {
                occupation: '',
                base: ''
            },
            connections: {
                groupAffiliation: "",
                relatives: ''
            },
            image: {
                url: ''
            },
            showHero: false
        }
    },
    computed: {
    
    },
    methods: {
        getData() {
            this.superheroes = [];
            this.loading = true;
            var vue = this;
            
            var url = 'https://cors-anywhere.herokuapp.com/superheroapi.com/api/10156992347158220/search/' + this.name;
            fetch(url, {mode: 'cors'})
                .then(function(response) {
                    vue.loading = false;
                    return response.json();
                }).then(function(json) {
                    console.log(json);
                    if (json.response === "error"){
                        vue.error = true;
                        return;
                    }
                    vue.error = false;
                    var results = json.results;
                    if (results){
                        for (var i = 0; i < results.length; i++){
                            var hero = results[i];
                            
                            var appearance = hero.appearance;
                            var eyeColor = appearance['eye-color'];
                            var gender = appearance.gender;
                            var hairColor = appearance['hair-color'];
                            var height = appearance.height;
                            var race = appearance.race;
                            var weight = appearance.weight;
                            
                            var biography = hero.biography;
                            var aliases = biography.aliases;
                            var alignment = biography.alignment;
                            var alterEgos = biography['alter-egos'];
                            var firstAppearance = biography['first-appearance'];
                            var fullName = biography['full-name'];
                            var placeOfBirth = biography['place-of-birth'];
                            var publisher = biography.publisher;
                            
                            var connections = hero.connections;
                            var groupAffiliation = connections['group-affiliations'];
                            var relatives = connections.relatives;
                            
                            
                            var superhero = {
                                id: hero.id,
                                name: hero.name,
                                powerstats: hero.powerstats,
                                biography: {
                                    fullName: fullName,
                                    alterEgos: alterEgos,
                                    aliases: aliases,
                                    placeOfBirth: placeOfBirth,
                                    firstAppearance: firstAppearance,
                                    publisher: publisher,
                                    alignment: alignment
                                },
                                appearance: {
                                    gender: gender,
                                    race: race,
                                    height: height,
                                    weight: weight,
                                    eyeColor: eyeColor,
                                    hairColor: hairColor
                                },
                                work: hero.work,
                                connections: hero.connections,
                                image: hero.image,
                                showHero: false
                            }
                            vue.superheroes.push(superhero);
                        }
                    }
                });
        },
        removeTile(){
            
        }
    }
});