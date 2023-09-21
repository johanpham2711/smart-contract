/* eslint-disable @typescript-eslint/naming-convention */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('wallets', 'tree_dump', 'wallet_list');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.renameColumn('wallets', 'wallet_list', 'tree_dump');
  },
};
