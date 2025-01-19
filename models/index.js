//const sequelize = require('../config/db');
//const connection = require("../config/database");
/*
const Forum = require('./Forum');
const Topic = require('./Topic');
const Post = require('./Post');
const User = require('./User');
const Pet = require('./Pet');
const Race = require('./Race');
const Specie = require('./Specie');
const OwnerWalkProposal = require('./OwnerWalkProposal');
const PetWalkerRequest = require('./PetWalkerRequest');
const Walk = require('./Walk');
const Photo = require('./Photo');
const Rating = require('./Rating');
const Badge = require('./Badge');
const Certify = require('./Certify');



//RELATION USER
User.hasMany(Topic, { foreignKey: 'UserId' });
User.hasMany(Post, { foreignKey: 'UserId' });
User.hasMany(Pet, { foreignKey: 'UserId' });
User.hasMany(PetWalkerRequest, { foreignKey: 'UserId' });

//RELATION FORUM
Forum.hasMany(Topic,{ foreignKey: 'ForumId' } )

//RELATION TOPIC
Topic.hasMany(Post, { foreignKey: 'TopicId' });
Topic.belongsTo(User, { foreignKey: 'UserId' });
Topic.belongsTo(Forum, { foreignKey: 'ForumId' })

//RELATION POST
Post.belongsTo(Topic, { foreignKey: 'TopicId' })
Post.belongsTo(User, { foreignKey: 'UserId' })

//RELATION
Race.hasMany(Pet, { foreignKey: 'RaceId' });
Race.belongsTo(Specie, { foreignKey: 'SpecieId' });

//RELATION PET
Pet.belongsTo(Race, { foreignKey: 'RaceId' });
Pet.belongsTo(User, { foreignKey: 'UserId' });
Pet.hasMany(OwnerWalkProposal, { foreignKey: 'PetId' });

//Specie
Specie.hasMany(Race, { foreignKey: 'SpecieId' });

//OwnerProposal
OwnerWalkProposal.belongsTo( Pet, { foreignKey: 'PetId' });

//PetWalkerRequest
PetWalkerRequest.belongsTo( User, { foreignKey: 'UserId' });
PetWalkerRequest.belongsTo( OwnerWalkProposal, { foreignKey: 'proposalId' });

 */


/*
sequelize.sync({ force: false })  // Définir `force: true` si vous voulez recréer les tables
    .then(() => console.log('Synchronisation réussie'))
    .catch((err) => console.error('Erreur de synchronisation', err));*/

/*
// Dans le modèle User
User.hasMany(Pet, { foreignKey: 'UserId' });
Pet.belongsTo(User, { foreignKey: 'UserId' });

// Dans le modèle Race
Race.hasMany(Pet, { foreignKey: 'RaceId' });
Pet.belongsTo(Race, { foreignKey: 'RaceId' });

User.hasMany(Topic);
Topic.belongsTo(User);

Forum.hasMany(Topic);
Topic.belongsTo(Forum);

Topic.hasMany(Post);
Post.belongsTo(Topic);

User.hasMany(Post);
Post.belongsTo(User);

User.belongsToMany(Badge, { through: Certify });
Badge.belongsToMany(User, { through: Certify });

Specie.hasMany(Race);
Race.belongsTo(Specie, { foreignKey: 'SpecieId' });

User.hasMany(OwnerWalkProposal);
OwnerWalkProposal.belongsTo(User);

Pet.hasMany(OwnerWalkProposal);
OwnerWalkProposal.belongsTo(Pet);

User.hasMany(PetWalkerRequest);
PetWalkerRequest.belongsTo(User);

OwnerWalkProposal.hasMany(PetWalkerRequest);
PetWalkerRequest.belongsTo(OwnerWalkProposal);

PetWalkerRequest.hasOne(Walk);
Walk.belongsTo(PetWalkerRequest);

Walk.hasMany(Rating);
Rating.belongsTo(Walk);

Walk.hasMany(Photo);
Photo.belongsTo(Walk);
*/


module.exports = {
    //Forum,
    //Topic,
    //Post,
    //User,
    //Pet,
    //Specie,
    //OwnerWalkProposal,
    //PetWalkerRequest,
    //Walk,
    //Photo,
    //Rating,
    //Badge,
    //Certify,
    //,
   // connection,
};