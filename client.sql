-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 08 mai 2024 à 02:56
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `client`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `motdepasse` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `admin`
--

INSERT INTO `admin` (`id`, `nom`, `prenom`, `email`, `motdepasse`) VALUES
(1, 'soka', 'soka', 'soka@gemail.com', '123');

-- --------------------------------------------------------

--
-- Structure de la table `centre`
--

CREATE TABLE `centre` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `capacite` int(11) DEFAULT NULL,
  `ville` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `centre`
--

INSERT INTO `centre` (`id`, `nom`, `adresse`, `telephone`, `admin_id`, `capacite`, `ville`, `region`) VALUES
(1, 'ibnsina', 'rabat.agdal.12', '0607564312', 1, 2, 'rabat', 'Rabat Salé Kénitra'),
(2, 'ibno lhaitam', 'ourzazat.hay mohmadi.12', '0607032537', 1, 16, 'Ourzazate', 'Drâa-Tafilalet'),
(3, 'hiba alkabira', 'casablanca.hay mohmadi.21', '0608564312', 1, 17, 'Casablanca', 'Casablanca-Settat'),
(4, 'El khawarizmi', 'Tanger.massira el khadra.2', '0689654327', 1, 30, 'Tanger', 'Tanger-Tétouan-Al Hoceïma'),
(5, 'Bouchaib dkali', 'Eljadida.haysalame.3', '0689657827', 1, 35, 'Eljadida', 'Casablanca-Settat'),
(6, 'okba bno nafiaa', 'zagora.tazzarine.22', '0607853421', 1, 20, 'Zagora', 'Drâa-Tafilalet');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `motdepasse` varchar(255) NOT NULL,
  `telephone` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `prenom`, `email`, `motdepasse`, `telephone`) VALUES
(7, 'Soka', 'Tasnime', 'Soka@gemail.com', '$2b$10$47R7xlWstSXSjEK29TPgyOTh8wjmjn2tTiOmpGnOk7E9vhH8kVOSu', '0607032537'),
(8, 'Soka', 'Soka', 'Soka4@gemail.com', '$2b$10$FyUCkh8pRy9qSzNlEbwkk..rSfRmG6E8VlPMvkSocUzRV7/goPxS6', '0607032537'),
(9, 'Soka', 'Soka', 'Soukaina@gemaul.com', '$2b$10$jPxyFDex0ElCZuZVyI9/O.t2m5rGOCrnvGVDiRW3fgXIJaeoSueaS', '060705434284'),
(10, 'Soukainatas', 'Tasnime', 'Tasnimesoka@gemail.com', '$2b$10$CP6y71JK4cj99IJPCwtfzusKiOVfDT2FhZpWPgG.dwEdK8ixP4No6', '0679038399');

-- --------------------------------------------------------

--
-- Structure de la table `creneau`
--

CREATE TABLE `creneau` (
  `id` int(11) NOT NULL,
  `heure_debut` time DEFAULT NULL,
  `heure_fin` time DEFAULT NULL,
  `disponibilite` tinyint(1) NOT NULL DEFAULT 1,
  `centre_id` int(11) NOT NULL,
  `nombre_rendezvous` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `creneau`
--

INSERT INTO `creneau` (`id`, `heure_debut`, `heure_fin`, `disponibilite`, `centre_id`, `nombre_rendezvous`) VALUES
(11, '08:00:00', '10:00:00', 1, 2, 0),
(12, '10:00:00', '12:00:00', 1, 2, 0),
(13, '12:00:00', '14:30:00', 1, 2, 0),
(14, '15:30:00', '18:30:00', 1, 2, 0),
(15, '08:30:00', '10:30:00', 1, 1, 0),
(16, '11:30:00', '12:30:00', 1, 1, 0),
(17, '13:30:00', '15:30:00', 1, 1, 0),
(18, '16:00:00', '18:30:00', 1, 3, 0),
(19, '09:00:00', '11:00:00', 3, 3, 0),
(20, '11:00:00', '15:30:00', 1, 3, 0),
(22, '15:30:00', '18:00:00', 3, 1, 0),
(24, '08:00:00', '10:30:00', 1, 4, 0),
(30, '13:00:00', '15:30:00', 3, 4, 0),
(31, '16:00:00', '19:30:00', 3, 4, 0),
(32, '08:00:00', '09:30:00', 3, 5, 0),
(33, '09:30:00', '12:30:00', 3, 5, 0),
(34, '14:00:00', '15:30:00', 3, 5, 0),
(35, '15:30:00', '19:30:00', 3, 5, 0),
(36, '16:00:00', '19:30:00', 3, 6, 0),
(37, '16:00:00', '17:30:00', 3, 6, 0),
(39, '15:00:00', '16:30:00', 3, 6, 0),
(40, '12:00:00', '14:30:00', 3, 6, 0),
(41, '10:30:00', '12:30:00', 4, 4, 0);

-- --------------------------------------------------------

--
-- Structure de la table `rdv2`
--

CREATE TABLE `rdv2` (
  `id` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `statut` varchar(255) DEFAULT NULL,
  `client_id` int(11) DEFAULT NULL,
  `centre_id` int(11) DEFAULT NULL,
  `creneau_id` int(11) DEFAULT NULL,
  `heure_debut` time DEFAULT NULL,
  `heure_fin` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `rdv2`
--

INSERT INTO `rdv2` (`id`, `date`, `statut`, `client_id`, `centre_id`, `creneau_id`, `heure_debut`, `heure_fin`) VALUES
(315, '2024-04-25', 'regeter', 8, 1, 15, '08:30:00', '10:30:00'),
(322, '2024-04-24', 'rejeter', 8, 1, 15, '08:30:00', '10:30:00'),
(324, '2024-04-24', 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(325, '2024-04-14', 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(334, '2024-04-26', 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(335, NULL, 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(336, NULL, 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(337, NULL, 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(338, NULL, 'accepter', 8, 1, 15, '08:30:00', '10:30:00'),
(352, '2024-05-15', 'accepter', 10, 1, 15, '08:30:00', '10:30:00'),
(353, '2024-05-08', 'accepter', 10, 1, 15, '08:30:00', '10:30:00'),
(354, '2024-05-08', 'accepter', 10, 1, 16, '11:30:00', '12:30:00'),
(355, '2024-05-06', 'accepter', 10, 1, 15, '08:30:00', '10:30:00'),
(356, '2024-05-06', 'accepter', 10, 1, 15, '08:30:00', '10:30:00'),
(357, '2024-05-06', 'rejeter', 10, 1, 15, '08:30:00', '10:30:00'),
(358, '2024-05-06', 'rejeter', 10, 1, 15, '08:30:00', '10:30:00'),
(359, NULL, 'accepter', 10, 1, 15, '08:30:00', '10:30:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `centre`
--
ALTER TABLE `centre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `admin_id` (`admin_id`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Index pour la table `creneau`
--
ALTER TABLE `creneau`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_centre` (`centre_id`);

--
-- Index pour la table `rdv2`
--
ALTER TABLE `rdv2`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `centre`
--
ALTER TABLE `centre`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `creneau`
--
ALTER TABLE `creneau`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT pour la table `rdv2`
--
ALTER TABLE `rdv2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=360;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `centre`
--
ALTER TABLE `centre`
  ADD CONSTRAINT `centre_ibfk_1` FOREIGN KEY (`admin_id`) REFERENCES `admin` (`id`);

--
-- Contraintes pour la table `creneau`
--
ALTER TABLE `creneau`
  ADD CONSTRAINT `creneau_ibfk_1` FOREIGN KEY (`centre_id`) REFERENCES `centre` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
