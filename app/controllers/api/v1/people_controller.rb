class Api::V1::PeopleController < ApplicationController
  def index
    @people = Person.all
  end

  def create
    @person = Person.create(name: params[:name], bio: params[:bio])
  end
end
