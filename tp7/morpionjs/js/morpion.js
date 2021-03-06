"use strict";
exports.__esModule = true;
exports.Morpion = void 0;
var Morpion = /** @class */ (function () {
    function Morpion(taille) {
        if (taille === void 0) { taille = 3; }
        this.setTaille(taille);
    }
    Morpion.prototype.setTaille = function (taille) {
        if (taille === void 0) { taille = 3; }
        var MAX_GRILLE = 8;
        var MIN_GRILLE = 3;
        if (Number.isNaN(taille) || taille < MIN_GRILLE || taille > MAX_GRILLE) {
            throw "Taille invalide !";
        }
        this.taille = taille;
        this.grille = new Array(taille);
        for (var i = 0; i < taille; i++) {
            this.grille[i] = new Array(taille);
            for (var j = 0; j < taille; j++) {
                this.grille[i][j] = ' ';
            }
        }
    };
    Morpion.prototype.setCase = function (symbole, y, x) {
        if (this.grille[y][x] === ' ') {
            this.grille[y][x] = symbole;
            return this.aGagne(symbole, y, x);
        }
        else {
            throw "Case déjà occupée !";
        }
    };
    Morpion.prototype.aGagne = function (symbole, y, x) {
        var nbSymboles;
        // gagné en ligne ?
        var ligne = y;
        nbSymboles = 0;
        for (var col_1 = 0; col_1 < this.taille; col_1++) {
            if (this.grille[ligne][col_1] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.taille) {
            return true;
        }
        // gagné en colonne ?
        var col = x;
        nbSymboles = 0;
        for (var ligne_1 = 0; ligne_1 < this.taille; ligne_1++) {
            if (this.grille[ligne_1][col] === symbole) {
                nbSymboles++;
            }
        }
        if (nbSymboles === this.taille) {
            return true;
        }
        // gagné diagonale
        if (x === y) {
            nbSymboles = 0;
            for (var lc = 0; lc < this.taille; lc++) {
                if (this.grille[lc][lc] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.taille) {
                return true;
            }
        }
        // gagné diag inverse
        if (x === (this.taille - (y + 1))) {
            nbSymboles = 0;
            for (var ligne_2 = 0; ligne_2 < this.taille; ligne_2++) {
                if (this.grille[ligne_2][this.taille - (ligne_2 + 1)] === symbole) {
                    nbSymboles++;
                }
            }
            if (nbSymboles === this.taille) {
                return true;
            }
        }
        return false;
    };
    return Morpion;
}());
exports.Morpion = Morpion;
