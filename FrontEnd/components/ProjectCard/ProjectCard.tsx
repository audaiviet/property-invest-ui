import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { IProject } from 'interfaces/IProject';
import { useQueryClient } from 'react-query';
import { useRouter } from 'next/router'

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    borderRadius: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'

  },
});

export function ProjectCard({project} : {project: IProject}) {
  const classes = useStyles();
  const client = useQueryClient()
  const router = useRouter()
  
  function learnMore(e: React.SyntheticEvent<EventTarget>, project: IProject) {
    e.preventDefault()
    client.setQueryData('currentProject', project)
    router.push(`/projects/${project.id}`)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={require("../../assets/img/contemplative-reptile.jpg")}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {project.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {project.description||null}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={e=>learnMore(e, project)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}
