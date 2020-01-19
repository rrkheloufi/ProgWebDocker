import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import * as BoxDB from "../Boxes/boxDbUtils";
import auth0Client from "../Auth";
import ReactStarRating from "react-star-ratings-component";

export function displayMealThumbnail(
  meal,
  boxes,
  displayboxpagethumbnail,
  box
) {
  let userEmail = auth0Client.getProfile().email;
  let isUserOwner = !displayboxpagethumbnail; // isUserOwner est à faux quand on est dans une boite. Il est à vrai sinon.
  if (box != null) {
    isUserOwner = box.ownerEmail === userEmail;
  }
  return (
    <div
      key={meal.idMeal}
      id={meal.idMeal}
      className="col-sm-12 col-md-4 col-lg-3"
    >
      <div className="card meal showAddBoxButton">
        {auth0Client.isAuthenticated() && isUserOwner && (
          <AddInBoxModal
            boxes={boxes}
            mealId={parseInt(meal.idMeal)}
            displayboxpagethumbnail={displayboxpagethumbnail}
            box={box}
          />
        )}
        <Link to={`/meal/${meal.idMeal}`}>
          <img src={meal.strMealThumb} className="card-img-top" alt="..." />
        </Link>
        <div className="card-body">
          <p className="card-title">{meal.strMeal}</p>
        </div>
      </div>
    </div>
  );
}

export function displayMealsThumbnail(
  meals,
  boxes,
  displayboxpagethumbnail,
  box
) {
  return meals.map(meal => {
    return this.displayMealThumbnail(meal, boxes, displayboxpagethumbnail, box);
  });
}

export function displayLoadingDots() {
  return (
    <div className="spinners">
      <div className="spinner-grow text-primary" role="status" />
      <div className="spinner-grow text-primary" role="status" />
      <div className="spinner-grow text-primary" role="status" />
    </div>
  );
}

export function AddComment(props) {
  let rating = 5;
  return (
    <form>
      <h5>
        <em>Did you try this recipe? Tell us what you thought !</em>
      </h5>
      <ReactStarRating
        numberOfStar={5}
        numberOfSelectedStar={5}
        colorFilledStar="orange"
        colorEmptyStar="white"
        starSize="30px"
        spaceBetweenStar="5px"
        disableOnSelect={false}
        onSelectStar={val => {
          rating = val;
        }}
      />

      <div class="form-group">
        <input class="form-control" id="title" placeholder="Title" required />
      </div>
      <div class="form-group">
        <textarea
          class="form-control"
          id="description"
          rows="3"
          placeholder="Comment"
        ></textarea>
      </div>
      <div class="form-group">
        <input class="form-control" id="name" placeholder="Name" required />
      </div>
      <button type="submit" class="btn btn-primary mb-2">
        Submit
      </button>
    </form>
  );
}

export function AddInBoxModal(props) {
  const [smShow, setSmShow] = useState(false);
  return (
    <ButtonToolbar>
      <Button
        type="button"
        onClick={() => {
          if (props.displayboxpagethumbnail === true) {
            BoxDB.removeMealFromBox(props.box, props.mealId);
            document.getElementById(props.mealId).remove();
          } else {
            setSmShow(true);
          }
        }}
        className="btn btn-danger btn-circle btn-xl addInBoxButton"
      >
        {props.displayboxpagethumbnail && (
          <i className="fa fa-trash" aria-hidden="true"></i>
        )}
        {!props.displayboxpagethumbnail && (
          <i className="fa fa-plus" aria-hidden="true"></i>
        )}
      </Button>
      <Modal
        {...props}
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Choose box...
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul className="list-group">
            {props.boxes &&
              props.boxes.map(box => boxListItem(box, props.mealId))}
          </ul>
        </Modal.Body>
      </Modal>
    </ButtonToolbar>
  );
}

function boxListItem(box, mealId) {
  mealId = parseInt(mealId);
  if (box.mealsIds.includes(mealId)) {
    return (
      <button
        key={box._id}
        type="button"
        className="btn btn-success btn-block"
        id={box._id + mealId}
        onClick={() => {
          refreshButton(box._id + mealId, false, box, mealId);
        }}
      >
        <i className="fa fa-check" aria-hidden="true"></i>
        {" " + box.name}
      </button>
    );
  } else {
    return (
      <button
        key={box._id}
        type="button"
        id={box._id + mealId}
        className="btn btn-outline-secondary btn-block"
        onClick={() => {
          refreshButton(box._id + mealId, true, box, mealId);
        }}
      >
        {box.name}
      </button>
    );
  }
}

async function refreshButton(buttonId, addMeal, box, mealId) {
  let button = document.getElementById(buttonId);
  if (addMeal) {
    BoxDB.addMealToBox(box, mealId);
    button.className = "btn btn-success btn-block";
  } else {
    BoxDB.removeMealFromBox(box, mealId);
    button.className = "btn btn-outline-secondary btn-block";
  }
}
