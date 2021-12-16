import { useQuery } from "@apollo/client"
import React from "react"
import { Button, ButtonGroup, Col, Modal, Row, Spinner } from "react-bootstrap"
import { client, GET_LOCALES } from "../../apollo-client"
import { LOCAL_IDENTIFIANT_FRANCAIS } from "../constants/constants"

export function ChooseEpdsLocale({ show, setShow, setLocaleSelected }) {
  const getLocalesInDatabase = () => {
    const { loading, error, data } = useQuery(GET_LOCALES, {
      client: client,
    })

    if (loading) return <Spinner animation="border" />
    if (error) return <p>Error</p>

    return data.locales.map((locale, index) => (
      <Col key={index} md="6">
        <FlagButton locale={locale} />
      </Col>
    ))
  }

  const FlagButton = ({ locale }) => {
    return (
      <Button
        className="fr-btn fr-btn--secondary flag-button"
        value={locale.identifiant}
      >
        <img
          alt="Drapeau"
          src={process.env.NEXT_PUBLIC_API_URL + locale.drapeau.url}
          height={26}
          style={{ marginRight: 10, borderRadius: 5 }}
        />
        {locale.libelle_francais}
        {locale.identifiant != LOCAL_IDENTIFIANT_FRANCAIS
          ? ` / ${locale.libelle_langue}`
          : null}
      </Button>
    )
  }

  const handleClick = (e) => {
    setLocaleSelected(e.target.value)
  }

  return (
    <>
      <Modal show={show} centered size="lg">
        <Modal.Header className="fr-modal__header header-choose-modal">
          <b>Changer de langue</b>
        </Modal.Header>

        <Modal.Body style={{ textAlign: "center" }}>
          <div>
            Choississez parmi cette liste, la langue que vous souhaitez pour
            faire passer l’EPDS :
          </div>

          <ButtonGroup toggle={true} onClick={handleClick}>
            <Row style={{ marginTop: 20 }}>{getLocalesInDatabase()}</Row>
          </ButtonGroup>
        </Modal.Body>

        <Modal.Footer
          style={{ alignSelf: "center", borderTop: "none", margin: 20 }}
        >
          <button
            className="fr-btn fr-btn--secondary"
            onClick={() => {
              setLocaleSelected("")
              setShow(false)
            }}
          >
            Annuler
          </button>
          <div style={{ width: 20 }} />
          <button className="fr-btn" onClick={() => setShow(false)}>
            Valider
          </button>
        </Modal.Footer>
      </Modal>

      <ChooseEpdsLocaleStyle />
    </>
  )
}

const ChooseEpdsLocaleStyle = () => (
  <style jsx="true">{`
    .header-choose-modal {
      color: var(--primary);
      border-bottom: none;
      align-self: center;
      font-size: 24px;
      margin-top: 23px;
    }
    .flag-button {
      margin-top: 10px;
      border: 0.5px solid #e7e7e7;
      box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.15);
      padding: 13px;
      width: 80%;
      min-width: 250px;
    }
  `}</style>
)
