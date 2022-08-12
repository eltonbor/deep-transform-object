const chai = require('chai');
const should = chai.should();

const sum = (a, b) => a + b;
const deepTransform = require('./index');

describe('Transform Deep Object Tests', function() {

    it('deep transform simple object', function() {
        const obj = {
            a: {
                b: {
                    c: [
                        { d: 1 },
                        { d: 400, e: 500 }
                    ],
                    leaveMeAlone: 1
                }
            }
        };
        deepTransform(obj, (i) => `${i}-transf`, 'a.b.c.d').should.be.eql({
            a: {
                b: {
                    c: [
                        { d: '1-transf' },
                        { d: '400-transf', e: 500 }
                    ],
                    leaveMeAlone: 1
                }
            }
        });
    });

    it('deep transform complex object', function() {
        const obj = {
            a: [
                {
                    b: {
                        c: [
                            { d: 1 },
                            { d: 2 },
                            { d: 3 },
                            { d: 3 },
                        ]
                    }
                },
                {
                    b: {
                        c: [
                            { d: 10 },
                            { d: 20 },
                            { d: 30 },
                        ]
                    }
                },
            ]
        };
        deepTransform(obj, String, 'a.b.c.d').should.be.eql({
            a: [
                {
                    b: {
                        c: [
                            { d: '1' },
                            { d: '2' },
                            { d: '3' },
                            { d: '3' },
                        ]
                    }
                },
                {
                    b: {
                        c: [
                            { d: '10' },
                            { d: '20' },
                            { d: '30' },
                        ]
                    }
                },
            ]
        });
    });

    it('return the same object if path not found', function() {
        const obj = { a: { b: { c: { d: 1 } } } };
        const result = deepTransform(obj, sum, 'X.a.b.c.d');
        result.should.be.equal(obj);
        result.should.be.eql(JSON.parse(JSON.stringify(obj)));
    });

    it('uses context', function() {
        const obj = { a: { b: { c: { d: 1 } } } };
        const myContext = { myValue: 1000 };
        const myTransformer = function(val) {
            return this.myValue + val;
        }
        deepTransform(obj, myTransformer, 'a.b.c.d', myContext).should.be.eql({ a: { b: { c: { d: 1001 } } } });
    });


    it('transform complex objects', function() {
        const obj = { a: { b: { c: { d1: 1, d2: 2} } } };
        const myTransformer = function(val) {
            delete val.d1;
            val.lalada = 'is very crazy';
            return val;
        }
        deepTransform(obj, myTransformer, 'a.b.c').should.be.eql({ a: { b: { c: { lalada: 'is very crazy', d2:2 } } } });
    });

});
