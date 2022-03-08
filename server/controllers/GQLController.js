const express = require('express');
const curl = require('curl');
const { graphql, buildSchema } = require('graphql');

const GQLController = {};

//j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W


GQLController.getGQLData = (req, res, next) => {
    const cloudflare_email = 'airbenderosp@gmail.com';
    const cloudflare_api_token = 'j9dhZHx0KsB5BAM1awwi_Hb7MXmkLegg2RdHuw-W';
    const payload = {
        query: {
            query{
                viewer {
                    zones ()
                }
            }
        }
    }
}


module.exports = GQLController;