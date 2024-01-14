import React from 'react'
import { GithubProfile } from '../types/GithubProfile'
import '../styles/components/card.css'

// Interface de typage des props du composent Card
interface CardProps {
  user: GithubProfile
}

// Création d'un composent Card qui affichera les informations d'un utilisateur
export default function Card({ user }: CardProps) {
  return (
    <div className="card">
      <div className="card__header">
        <input type="checkbox" />
      </div>
      <div className="card__body">
        <img className="card__body__avatar" src="" alt="" />
        <div className="card__body__infos">
          <h3 className="card__body__infos__name">Nom de l'utilisateur</h3>
          <p className="card__body__infos__login">Login de l'utilisateur</p>
        </div>
      </div>
    </div>
  )
}
