const { Router } = require('express');

const router = Router();

// Import des controllers 
const betController = require('./controllers/betController');
const reviewController = require('./controllers/reviewController');
const userController = require('./controllers/userController');
const matchController = require('./controllers/matchController');
const sportsController = require('./controllers/sportsController');
const bookmakerController = require('./controllers/bookmakerController');
//const authToken = require('../middleware/authenticateToken')

const { validateBody } = require('./services/validator');

// Import des schemas
const { postBetSchema, betSchemas} = require('./shemas/bet');
const { userSchema, postUserSchema } = require('./shemas/user');
const reviewSchema = require('./shemas/review'); 
const { postMatchSchema, matchSchemas } = require('./shemas/match');
const { postSportSchemas, sportSchemas } = require('./shemas/sport');
const { postBookmakerSchemas, bookmakerSchemas } = require('./shemas/bookmarker');



// v

// bet part =>
/**
 * Récupére tout les Bets dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /bets
 * @group bets - Présentation des bets
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/bets', betController.getAllBets);

/**
 * Récupére le bet présent a l'id mentioné dans la bdd
 * @route GET /bets/:id
 * @group bets - Présentation des bets 
 * @param {number} id.body - id du paris
 * @returns {object} qui contient: id, create_date, cote, mise,
     * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
     * end_game, score, sport_id, name, league
 */
router.get('/bets/:id(\\d+)', betController.getOneBet);

/**
 * Récupére le meilleur gain
 * @route GET /bestBet
 * @group bets - Présentation des bets 
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/bestBet', betController.getBestBet);

/**
 * Récupére le meilleur gain
 * @route GET /badestBet
 * @group bets - Présentation des bets 
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/badestBet', betController.getBadestBet);
/**
 * Ajoute un nouveaux bet 
 * @route POST /bets
 * @group bets - Présentation des bets*
 * @param {number} id.boddy - id du paris
 * @param {string} type.body - type du paris 
 * @param {number} cote.body - cote du paris
 * @param {number} mise.body - Mise du paris
 * @param {string} beting_team.body - la team sur la quelle on paris
 * @param {number} user_id.body - le user pour le quelle on paris
 * @param {number} bookmaker_id.body - l 'id du bookmaker
 * @returns {object} 200 - le bet et généré dans la BDD
 */
router.post('/bets', validateBody(postBetSchema), betController.saveBet);

/**
 * Suprime le bet présent a l'id mentioné dans la bdd
 * @route DELETE /bets/:id
 * @group bets - Présentation des bets
 * @param {number} id.body - L'id du bet
 * @returns 200 - bet suprimé de la bdd
 */
router.delete('/bets/:id(\\d+)', betController.deleteBet);

/**
 * Modifie un bet dans la bdd avec les infomation fournie dans le body 
 * @route PATCH /bets/:id
 * @group bets - Présentation des bets
 * @param {number} id.body - id du paris
 * @param {string} type.body - type du paris 
 * @param {number} cote.body - cote du paris
 * @param {number} mise.body - Mise du paris
 * @param {string}beting_team.body - la team sur la quelle on paris
 * @param {number}user_id.body - le user pour le quelle on paris
 * @param {number}bookmaker_id.body - l 'id du bookmaker
 * @returns {object} 200 - le bet et modifié dans la BDD
 */
router.patch('/bets/:id(\\d+)', validateBody(betSchemas), betController.updateBet);

// simple bet part => 

/**
 * Récupére tout les Bets simple dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /simpleBets
 * @group simple bets - Présentation des simple bets
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/simpleBets', betController.getAllSimpleBets);

/**
 * Récupére le simple bet présent a l'id mentioné dans la bdd
 * @route GET /simpleBets/:id
 * @group simple bets - Présentation des simple bets
 * @param {number} id.body - L'id du simple bet
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/simpleBets/:id(\\d+)', betController.getOneSimpleBet);

/**
 * Récupére les trois dernier bet simple
 * @route GET /lastSimpleBets
 * @group simple bets - Présentation des simple bets
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/lastSimpleBets', betController.getLastSimpleCombineBet);










// combine bet part => 

/**
 * Récupére tout les Bets combiné dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /combineBets
 * @group Combine bets - Présentation des bets combiné 
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/combineBets', betController.getAllCombineBets);

/**
 * Récupére le simple bet présent a l'id mentioné dans la bdd
 * @route GET /combineBets/:id
 * @group Combine bets - Présentation des bets combiné
 * @param {number} id.body - L'id du bet combiné 
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/combineBets/:id(\\d+)', betController.getOneCombineBet);

/**
 * Récupére les trois dernier bet combinée
 * @route GET /lastCombineBets
 * @group Combine bets - Présentation des bets combiné
 * @returns {object} qui contient: id, create_date, cote, mise,
 * beting_team, gain, user_id, bookmaker_id, brand, slug, date,
 * end_game, score, sport_id, name, league
 */
router.get('/lastCombineBets', betController.getLastCombineBet);

// incoming bets part =>

/**
 * Récupére tout les futur Bets  dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /allLastIncomingBets
 * @group incoming bets - Présentation des futur bets
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/allLastIncomingBets', betController.getAllLastBetsIncoming);

/**
 * Récupére tout le futur Bet  dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /lastIncomingBets
 * @group incoming bets - Présentation des futur bets
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/lastBetIncoming', betController.getLastBetIncoming);






// played bets part => 

/**
 * Récupére tout les Bets fini dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /allLastPlayedBets
 * @group played bets - Présentation des bets fini
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/allLastPlayedBets', betController.getAllLastBetsPlayed);

/**
 * Récupére tout le dernier Bets fini dans la bdd ainsi que le match, bookmaker, sport liée a ce paris 
 * @route GET /lastPlayedBets
 * @group played bets - Présentation des bets fini
 * @returns {object} qui contient : id, create_date, cote, mise, 
 * beting_team, gain, user_id, bookmaker_id, brand, slug,date, 
 * end_game, score, sport_id, name, league
 */
router.get('/lastPlayedBet', betController.getLastBetPlayed);








// user part =>

/**
 * Récupére tous les users présent dans la bdd
 * @route GET /user
 * @group users - Présentation des users 
 * @returns {object} qui contient: id, lastname, firstname, mail, password, role
 */
router.get('/user', userController.getAllUsers);

/**
 * Récupére le users présent a l'id mentioné dans la bdd
 * @route GET /user/:id
 * @group users - Présentation des users
 * @param {number} id.body - id de l'user 
 * @returns {object} qui contient: id, lastname, firstname, mail, password, role
 */
router.get('/user/:id(\\d+)', userController.oneUser);

/**
 * ajout un user dans la bdd avec les infomation fournie dans le body 
 * @route POST /user
 * @group users - Présentation des users
 * @param {string} lastname.body - Nom de user
 * @param {string} firstname.body - Prenom du user
 * @param {string} mail.body - Mail du user
 * @param {password}password.body - Mots de passe du user
 * @param {string}role.body - Role du user 
 * @returns {object} 200 - le user et ajouté a la bdd 
 */
router.post('/user/register', validateBody(postUserSchema),  userController.saveUser);


/**
 * Route pour ce conecté
 * @route POST /user/login
 * @group users - Présentation des users
 * @param {string} mail.body - Mail du user
 * @param {password}password.body - Mots de passe du user
 * @returns {object} 201 - le user et conecté
 */
router.post('/user/login', userController.login);


/**
 * Modifie un user dans la bdd avec les infomation fournie dans le body 
 * @route PATCH /user/:id
 * @group users - Présentation des users
 * @param {number} id.body - id de l'user
 * @param {string} lastname.body - Nom de user
 * @param {string} firstname.body - Prenom du user
 * @param {string} mail.body - Mail du user
 * @param {password}password.body - Mots de passe du user
 * @param {string}role.body - Role du user 
 * @returns {object} 200 - le user et modifié dans la bdd 
 */
router.patch('/user/:id(\\d+)', validateBody(userSchema) ,userController.updateUser);

/**
 * Suprime le user présent a l'id mentioné dans la bdd
 * @route DELETE /user/:id
 * @param {number} id.body - id de l'user
 * @group users - Présentation des users
 * @returns 200 - user suprimé de la bdd
 */
router.delete('/user/:id(\\d+)', userController.deleteUser);












// match part =>
/**
 * Récupére tout les matchs dans la bdd 
 * @route GET /matchs
 * @group matchs - Présentation des matchs
 * @returns {object} qui contient: id, host_team, visitor, date,
     * end_game, score, winner_team, looser_team, cote, sport_id, bet_id
 */
router.get('/matchs', matchController.getAllMatchs);
/**
 * Récupére le match présent a l'id mentioné dans la bdd
 * @route GET /matchs/:id
 * @group matchs - Présentation des matchs 
 * @param {number} id.body - l'i du match
 * @returns {object} qui contient: id, host_team, visitor, date,
 * end_game, score, winner_team, looser_team, cote, sport_id, bet_id
 */
router.get('/matchs/:id(\\d+)', matchController.getOneMatch);

/**
 * Ajoute un nouveaux match 
 * @route POST /matchs
 * @group matchs - Présentation des matchs
 * @param {string} host_team.body - Nom de l'équipe a domicile
 * @param {string} visitor.body - Nom de l'équipe visiteur
 * @param {date} date.body - date et heure du début du match
 * @param {date}end_game.body - date et heure de la fin du match
 * @param {string}score.body - score du match
 * @param {string}winner_team.body - Nom de l'équipe gagnante
 * @param {string}looser_team.body - Nom de l'équipe perdante
 * @param {number}cote - cote du match
 * @param {number}sport_id - l'id du sport
 * @param {number} bet_id -l'id du paris
 * @returns {object} 200 - le match et généré dans la BDD
 */
router.post('/matchs', validateBody(postMatchSchema), matchController.saveMatch);

/**
 * Suprime le match présent a l'id mentioné dans la bdd
 * @route DELETE /matchs/:id
 * @param {number} id.body - l'id du match
 * @group matchs - Présentation des matchs
 * @returns 200 - le match suprimé de la bdd
 */
router.delete('/matchs/:id(d\\+)', matchController.deleteMatch);

/**
 * Modifie un match 
 * @route PATCH /matchs/:id
 * @group matchs - Présentation des matchs
 * @param {number} id.body - id du match
 * @param {string} host_team.body - Nom de l'équipe a domicile
 * @param {string} visitor.body - Nom de l'équipe visiteur
 * @param {date} date.body - date et heure du début du match
 * @param {date}end_game.body - date et heure de la fin du match
 * @param {string}score.body - score du match
 * @param {string}winner_team.body - Nom de l'équipe gagnante
 * @param {string}looser_team.body - Nom de l'équipe perdante
 * @param {number}cote - cote du match
 * @param {number}sport_id - l'id du sport
 * @param {number} bet_id -l'id du paris
 * @returns {object} 200 - le match et modifié dans la BDD
 */
router.patch('/matchs/:id(\\d+)', validateBody(matchSchemas), matchController.updateMatch);

// sport part =>
/**
 * Récupére tout les sports dans la bdd 
 * @route GET /sports
 * @group sports- Présentation des sports
 * @returns {object} qui contient : id, name, league
 */
router.get('/sports', sportsController.getAllSports);

/**
 * Récupére le sports a l'id mentioné 
 * @route GET /sports/:id
 * @param {number} id.body - id du sport
 * @group sports- Présentation des sports
 * @returns {object} qui contient : id, name, league
 */
router.get('/sports/:id(\\d+)', sportsController.getOneSport);

/**
 * Ajoute un nouveaux sports 
 * @route POST /sports
 * @group sports - Présentation des sports
 * @param {string} name.body - Nom du sport
 * @param {string} league.body - Nom de la league
 * @returns {object} 200 - le sport et généré dans la BDD
 */
router.post('/sports', validateBody(postSportSchemas) ,sportsController.saveSport);

/**
 * Modifie un sports 
 * @route PATCH /sports/:id
 * @group sports - Présentation des sports
 * @param {number} id.boddy - id du sport
 * @param {string} name.body - Nom du sport
 * @param {string} league.body - Nom de la league
 * @returns {object} 200 - le sport et généré dans la BDD
 */
router.patch('/sports/:id(\\d+)',validateBody(sportSchemas), sportsController.updateSport); 

/**
 * Suprime le sport présent a l'id mentioné dans la bdd
 * @route DELETE /sports/:id
 * @group sports - Présentation des sports
 * @param {number} id.boddy - id du sport
 * @returns 200 - le sport suprimé de la bdd
 */
router.delete('/sports/:id(\\d+)', sportsController.deleteSport);

// bookmakers part =>

/**
 * Récupére tout les Bookmakers dans la bdd  
 * @route GET /bookmakers
 * @group bookmakers - Présentation des bookmakers
 * @returns {object} qui contient : id, brand, slug
 */
router.get('/bookmakers', bookmakerController.getAllBookmakers);

/**
 * Récupére le Bookmaker a l'id mentioné 
 * @route GET /bookmakers/:id
 * @param {number} id.body - id du bookmaker
 * @group bookmakers - Présentation des bookmakers
 * @returns {object} qui contient : id, brand, slug
 */
router.get('/bookmakers/:id(\\d+)', bookmakerController.getOneBookmaker);

/**
 * ajoute un bookmaker 
 * @route POST /bookmakers
 * @group bookmakers - Présentation des bookmakers
 * @param {string} brand.body - Nom du bookmaker
 * @param {string} slug.body - liens vers le site du bookmaker
 * @returns {object} 200 - le bookmaker et généré dans la BDD
 */
router.post('/bookmakers', validateBody(postBookmakerSchemas), bookmakerController.saveBookmaker);

/**
 * Modifie un bookmaker 
 * @route PATCH /bookmakers/:id
 * @group bookmakers - Présentation des bookmakers
 * @param {number} id.boddy - id du bookmaker 
 * @param {string} brand.body - Nom du bookmaker
 * @param {string} slug.body - liens vers le site du bookmaker
 * @returns {object} 200 - le bookmaker et modifié dans la BDD
 */
router.patch('/bookmakers/:id(\\d+)', validateBody(bookmakerSchemas), bookmakerController.updateBookmaker);

/**
 * Suprime le bookmaker présent a l'id mentioné dans la bdd ainsi que les bet/match lié a ce bookmaker
 * @param {number} id.boddy - id bookmaker
 * @route DELETE /bookmakers/:id
 * @group bookmakers - Présentation des bookmakers
 * @returns 200 - le bookmaker suprimé de la bdd ainsi que les bet/match lié 
 */
router.delete('/bookmakers/:id(\\d+)', bookmakerController.deleteBookmaker);

module.exports = router;