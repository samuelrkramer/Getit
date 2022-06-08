from app.models import db, Comment


# Adds demo comments, you can add other comments here if you want
def seed_comments():
    comm1 = Comment(
        userId=2, postId=1, body='fir.. wait')
    comm2 = Comment(
        userId=3, postId=2, body='oh cool another star wars reference')
    comm3 = Comment(
        userId=1, postId=3, body='a seed file production')
    comm4 = Comment(
        userId=3, postId=4, body='no fair, I need a body')
    comm5 = Comment(
        userId=2, postId=1, body='I forget what this is on')
    comm6 = Comment(
        userId=1, postId=2, body='lame I know')

    db.session.add(comm1)
    db.session.add(comm2)
    db.session.add(comm3)
    db.session.add(comm4)
    db.session.add(comm5)
    db.session.add(comm6)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the comments table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_comments():
    db.session.execute('TRUNCATE comments RESTART IDENTITY CASCADE;')
    db.session.commit()
