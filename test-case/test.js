const chai = require('chai');
const chatHttp = require('chai-http');
const app = require("../src/index.js");
const expect = chai.expect;
const Subscriber = require('../src/models/subscribers.js');

chai.use(chatHttp);

describe('Subscribers API', () => {
    describe('GET /subscribers', () => {
        it('should obtain a complete list of all subscribers', (done) => {
            chai.request(app)
                .get('/subscribers')
                .end((err, res) => {
                    if (err)
                        return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });


    describe('GET /subscribers/names', () => {
        it('should retrieve the names and subscribed channels of every subscriber.', (done) => {
            chai.request(app)
                .get('/subscribers/names')
                .end((err, res) => {
                    if (err)
                        return done(err);
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });



    describe('GET /subscribers/:id', () => {
        it('should retrieve subscriber information using their ID', async () => {
            const subscriber = await Subscriber.findOne();

            if (!subscriber) {
                throw new Error('Sorry, we could not find any subscriber documents in the collection.')
            }

            const subscriberId = subscriber._id.toString();

            const response = await chai.request(app).get(`/subscribers/${subscriberId}`);


            expect(response).to.have.status(200);
            expect(response.body).to.have.property('_id', subscriberId);
        });
    });
});





/* !! Important Note !! 
    // Before running the test with "npm test" in terminal, add 'module.exports=' in index.js file on line No. 38 
    // Replace or comment the line 38 app.listen(port, .....

    // And add instead of the above line ,

     module.exports = app.listen(port, () => console.log(`App listening on port ${port}!`)); 

     // Save and rum "npm test" - all test cases will run successfully
*/
