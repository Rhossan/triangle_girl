function updateLeftStack(wallStack){
  var newWall = {x: wallStack[0].x+10, y: 10}
  var newWall2 = {x: wallStack[0].x-10, y: 10}
  var wall = [newWall, newWall2];
  var wallChosen = wall[Math.floor(Math.random() * wall.length)];
  if (wallChosen.x < 50){wallChosen.x = 50;}
  if (wallChosen.x > 400){wallChosen.x = 400;}
  // wallStack.unshift(wallChosen);
  return wallChosen;
}

function updateRightStack(wallStack){
  var newWall = {x: wallStack[0].x+10, y: 10}
  var newWall2 = {x: wallStack[0].x-10, y: 10}
  var wall = [newWall, newWall2];
  var wallChosen = wall[Math.floor(Math.random() * wall.length)];
  if (wallChosen.x < 200){wallChosen.x = 200;}
  if (wallChosen.x > 475){wallChosen.x = 475;}
  // wallStack.unshift(wallChosen);
  return wallChosen;
}
