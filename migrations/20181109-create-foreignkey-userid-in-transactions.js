'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.addColumn(
            'Transactions',
            'userid',{
                type : Sequelize.INTEGER,
                allowNull : false,
                model: 'Users',
                key: 'id'
            }
        
        )

    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.removeColumn(
            'Transactions',
            'userid'
        );

    }
};