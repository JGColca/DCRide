'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {

        return queryInterface.addColumn(
            'Transactions',
            'carid',{
                type : Sequelize.INTEGER,
                allowNull : false,
                references:{
                model: 'Cars',
                key: 'id'
            }
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
