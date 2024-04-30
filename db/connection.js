require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');







const sequelize = new Sequelize(
   "purpose_black_db", 
   "purpose_black__user",
  "123456789", {
        host: process.env.DATABASE_HOST,
        dialect: 'postgres',
    });

    

const Post = sequelize.define('Post', {
            id: {
              type: DataTypes.STRING,
              primaryKey: true,
              allowNull:false
            },
            text: {
              type: DataTypes.TEXT,
              allowNull: true,
            },

            timestamp : {
              type: DataTypes.TIME,
              allowNull: true,

            }
            
          });
          
          // Create the table if it doesn't exist
          Post.sync();
          
module.exports ={ Post};




