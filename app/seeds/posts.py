from app.models import db, Post


# Adds demo posts, you can add other posts here if you want
def seed_posts():
    post1 = Post(
        userId=1, title='First post', body='first!!1!')
    post2 = Post(
        userId=2, title='The seed post strikes back', body='this has a body')
    post3 = Post(
        userId=1, title='Return of the seed post', body='how did I see this in theaters? that makes no sense')
    post4 = Post(
        userId=2, title='Title but no body')

    db.session.add(post1)
    db.session.add(post2)
    db.session.add(post3)
    db.session.add(post4)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the posts table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_posts():
    db.session.execute('TRUNCATE posts RESTART IDENTITY CASCADE;')
    db.session.commit()
