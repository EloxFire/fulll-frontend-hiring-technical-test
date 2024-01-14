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
        {(user && user.avatar_url !== "") && <img className="card__body__avatar" src="" alt="" />}
        {(!user || (user && user.avatar_url === "")) && <div className="card__body__avatar--default">Avatar</div>}
        <div className="card__body__infos">
          <p className="card__body__infos__text">ID</p>
          <p className="card__body__infos__text">Login</p>
        </div>
      </div>
      <button className="card__button">View profile</button>
    </div>
  )
}
